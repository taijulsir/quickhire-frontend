'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoChevronDown, IoClose } from 'react-icons/io5'
import { jobService, type SearchResult } from '@/services/jobService'
import { BASE_URL } from '@/services/api'

export default function SearchBox() {
    const router = useRouter()
    const [keyword, setKeyword] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const [locations, setLocations] = useState<string[]>([])
    const [locationsLoading, setLocationsLoading] = useState(true)
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [showResults, setShowResults] = useState(false)
    const [searching, setSearching] = useState(false)

    const locationRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const locationTriggerRef = useRef<HTMLDivElement>(null)
    const searchTriggerRef = useRef<HTMLDivElement>(null)
    const locationDropdownRef = useRef<HTMLDivElement>(null)
    const searchDropdownRef = useRef<HTMLDivElement>(null)
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Track dropdown positions for portal rendering
    const [locationDropdownStyle, setLocationDropdownStyle] = useState<React.CSSProperties>({})
    const [searchDropdownStyle, setSearchDropdownStyle] = useState<React.CSSProperties>({})

    // Update dropdown position
    const updateLocationPosition = useCallback(() => {
        if (locationTriggerRef.current) {
            const rect = locationTriggerRef.current.getBoundingClientRect()
            setLocationDropdownStyle({
                position: 'fixed',
                top: rect.bottom,
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
            })
        }
    }, [])

    const updateSearchPosition = useCallback(() => {
        if (searchTriggerRef.current) {
            const rect = searchTriggerRef.current.getBoundingClientRect()
            setSearchDropdownStyle({
                position: 'fixed',
                top: rect.bottom,
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
            })
        }
    }, [])

    // Update positions on scroll/resize
    useEffect(() => {
        if (!isLocationOpen && !showResults) return

        const handleUpdate = () => {
            if (isLocationOpen) updateLocationPosition()
            if (showResults) updateSearchPosition()
        }

        window.addEventListener('scroll', handleUpdate, true)
        window.addEventListener('resize', handleUpdate)
        return () => {
            window.removeEventListener('scroll', handleUpdate, true)
            window.removeEventListener('resize', handleUpdate)
        }
    }, [isLocationOpen, showResults, updateLocationPosition, updateSearchPosition])

    // Fetch dynamic locations from backend
    useEffect(() => {
        const fetchLocations = async () => {
            setLocationsLoading(true)
            try {
                const data = await jobService.getLocations()
                setLocations(data)
            } catch {
                setLocations([])
            } finally {
                setLocationsLoading(false)
            }
        }
        fetchLocations()
    }, [])

    // Close dropdowns on outside click (check both trigger area and portal dropdown)
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node
            const clickedInsideLocation = locationRef.current?.contains(target) || locationDropdownRef.current?.contains(target)
            const clickedInsideSearch = searchRef.current?.contains(target) || searchDropdownRef.current?.contains(target)

            if (!clickedInsideLocation) {
                setIsLocationOpen(false)
            }
            if (!clickedInsideSearch) {
                setShowResults(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Debounced search
    const handleSearch = useCallback((value: string) => {
        setKeyword(value)
        if (debounceTimer.current) clearTimeout(debounceTimer.current)

        if (!value.trim()) {
            setSearchResults([])
            setShowResults(false)
            return
        }

        debounceTimer.current = setTimeout(async () => {
            setSearching(true)
            try {
                const data = await jobService.searchJobs(value)
                setSearchResults(data)
                setShowResults(true)
                updateSearchPosition()
            } catch {
                setSearchResults([])
            } finally {
                setSearching(false)
            }
        }, 300)
    }, [updateSearchPosition])

    // Navigate to /jobs with filters
    const handleSubmit = () => {
        const params = new URLSearchParams()
        if (keyword.trim()) params.set('search', keyword.trim())
        if (selectedLocation) params.set('location', selectedLocation)
        const qs = params.toString()
        router.push(`/jobs${qs ? `?${qs}` : ''}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setShowResults(false)
            handleSubmit()
        }
    }

    // Build logo URL
    const getLogoUrl = (logo: string) => {
        if (!logo) return ''
        if (logo.startsWith('http')) return logo
        return `${BASE_URL}${logo}`
    }

    // Search results dropdown (portal)
    const searchDropdown = showResults && typeof window !== 'undefined' ? createPortal(
        <div
            ref={searchDropdownRef}
            style={searchDropdownStyle}
            className='bg-white border border-[#D6DDEB] rounded-b-sm shadow-lg max-h-80 overflow-y-auto'
            onMouseDown={(e) => e.stopPropagation()}
        >
            {searching ? (
                <div className='px-5 py-4 flex items-center gap-3'>
                    <div className='w-4 h-4 border-2 border-[#D6DDEB] border-t-[#4640DE] rounded-full animate-spin' />
                    <span className='text-sm text-[#7C8493]'>Searching...</span>
                </div>
            ) : searchResults.length === 0 ? (
                <div className='px-5 py-4 text-sm text-[#7C8493]'>No jobs found for &ldquo;{keyword}&rdquo;</div>
            ) : (
                <>
                    {searchResults.map((job) => (
                        <Link
                            key={job._id}
                            href={`/jobs/${job._id}`}
                            onClick={() => setShowResults(false)}
                            className='flex items-center gap-3 px-5 py-3 hover:bg-[#F8F8FD] transition-colors border-b border-[#D6DDEB] last:border-0'
                        >
                            {job.logo ? (
                                <img src={getLogoUrl(job.logo)} alt={job.companyName} className='w-9 h-9 rounded-lg object-cover shrink-0' />
                            ) : (
                                <div className='w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold bg-[#F0F0FF] text-[#4640DE]'>
                                    {job.companyName.charAt(0)}
                                </div>
                            )}
                            <div className='min-w-0 flex-1'>
                                <p className='text-sm font-semibold text-[#25324B] truncate'>{job.jobName}</p>
                                <p className='text-xs text-[#7C8493] truncate flex items-center gap-1.5'>
                                    <span>{job.companyName}</span>
                                    <span className='text-[#D6DDEB]'>&bull;</span>
                                    <FiMapPin className='text-[10px] shrink-0' />
                                    <span>{job.location}</span>
                                </p>
                            </div>
                            <span className='text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#4640DE]/10 text-[#4640DE] shrink-0'>{job.time}</span>
                        </Link>
                    ))}
                    <button
                        onClick={() => { setShowResults(false); handleSubmit() }}
                        className='w-full px-5 py-2.5 text-xs font-semibold text-[#4640DE] hover:bg-[#F0F0FF] transition-colors text-center'
                    >
                        View all results for &ldquo;{keyword}&rdquo;
                    </button>
                </>
            )}
        </div>,
        document.body
    ) : null

    // Location dropdown (portal)
    const locationDropdown = isLocationOpen && typeof window !== 'undefined' ? createPortal(
        <div
            ref={locationDropdownRef}
            style={locationDropdownStyle}
            className='bg-white border border-[#D6DDEB] rounded-b-sm shadow-lg max-h-[200px] overflow-y-auto'
            onMouseDown={(e) => e.stopPropagation()}
        >
            {locationsLoading ? (
                <div className='px-5 py-4 flex items-center gap-3'>
                    <div className='w-4 h-4 border-2 border-[#D6DDEB] border-t-[#4640DE] rounded-full animate-spin' />
                    <span className='text-sm text-[#7C8493]'>Loading locations...</span>
                </div>
            ) : locations.length === 0 ? (
                <div className='px-5 py-3 text-sm text-[#7C8493]'>No locations available</div>
            ) : (
                locations.map((location) => (
                    <div
                        key={location}
                        className={`px-5 py-2.5 text-sm cursor-pointer transition-colors hover:bg-[#F8F8FD] ${selectedLocation === location ? 'text-[#4640DE] font-medium bg-[#F0F0FF]' : 'text-[#25324B]'}`}
                        onClick={() => {
                            setSelectedLocation(location)
                            setIsLocationOpen(false)
                        }}
                    >
                        {location}
                    </div>
                ))
            )}
        </div>,
        document.body
    ) : null

    return (
        <div className='flex flex-col md:flex-row md:items-center bg-white shadow-[0px_18px_50px_-12px_rgba(38,43,63,0.12)] rounded-sm'>
            {/* Job title input with autocomplete */}
            <div className='relative flex-1' ref={searchRef}>
                <div ref={searchTriggerRef} className='flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-[#D6DDEB]'>
                    <FiSearch className='text-[#515B6F] text-xl shrink-0' />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => { if (searchResults.length > 0) { setShowResults(true); updateSearchPosition() } }}
                        onKeyDown={handleKeyDown}
                        placeholder="Job title or keyword"
                        className='w-full text-sm text-[#25324B] placeholder-[#A8ADB7] outline-none bg-transparent'
                    />
                    {keyword && (
                        <button onClick={() => { setKeyword(''); setSearchResults([]); setShowResults(false) }} className='text-[#A8ADB7] hover:text-[#515B6F] transition-colors shrink-0'>
                            <IoClose className='text-base' />
                        </button>
                    )}
                </div>
                {searchDropdown}
            </div>

            {/* Location dropdown - dynamic */}
            <div className='relative flex-1' ref={locationRef}>
                <div
                    ref={locationTriggerRef}
                    className='flex items-center gap-3 px-5 py-4 cursor-pointer'
                    onClick={() => { setIsLocationOpen(!isLocationOpen); updateLocationPosition() }}
                >
                    <HiOutlineLocationMarker className='text-[#515B6F] text-xl shrink-0' />
                    <div className='flex items-center justify-between w-full'>
                        <span className={`text-sm ${selectedLocation ? 'text-[#25324B]' : 'text-[#A8ADB7]'}`}>
                            {selectedLocation || 'Select location'}
                        </span>
                        <div className='flex items-center gap-1'>
                            {selectedLocation && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedLocation('') }}
                                    className='text-[#A8ADB7] hover:text-[#515B6F] transition-colors'
                                >
                                    <IoClose className='text-sm' />
                                </button>
                            )}
                            <IoChevronDown className={`text-[#515B6F] text-base shrink-0 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </div>
                {locationDropdown}
            </div>

            {/* Search button */}
            <div className='px-3 py-2.5 md:py-2.5'>
                <button
                    onClick={() => { setShowResults(false); handleSubmit() }}
                    className='w-full md:w-auto px-6 py-3 bg-[#4640DE] text-white text-lg font-bold rounded-sm hover:bg-[#3730A3] transition-colors whitespace-nowrap cursor-pointer'
                >
                    Search my job
                </button>
            </div>
        </div>
    )
}
