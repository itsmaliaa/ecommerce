import React, { useState } from 'react';
import {
  ArrowRight,
  Heart,
  Palette,
  Sparkles,
  Layers,
  MapPin,
  Check,
} from 'lucide-react';
import { ArtistDirectoryItem } from '../types';

interface ArtistsDirectoryViewProps {
  artists: ArtistDirectoryItem[];
  onSelectArtist: (artist: ArtistDirectoryItem) => void;
  onToggleFollow: (id: string) => void;
  initialArtType?: string;
}

export const ArtistsDirectoryView: React.FC<ArtistsDirectoryViewProps> = ({
  artists,
  onSelectArtist,
  onToggleFollow,
  initialArtType = 'All',
}) => {
  const [selectedArtType, setSelectedArtType] = useState<string>(initialArtType);
  const [sortBy, setSortBy] = useState<'hearts' | 'artworks' | 'sales' | 'rating' | 'name'>('hearts');

  const artTypes = [
    'All',
    'Painting',
    'Sculpture',
    'Architecture',
    'Photography',
    'Digital Art',
    'Mixed Media',
  ];

  const getArtTypeCount = (type: string) => {
    if (type === 'All') return artists.length;
    return artists.filter((a) => a.artType === type).length;
  };

  const filteredArtists = artists
    .filter((artist) => {
      if (selectedArtType !== 'All' && artist.artType !== selectedArtType) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'hearts') return (b.followers * 4) - (a.followers * 4);
      if (sortBy === 'artworks') return b.artworksCount - a.artworksCount;
      if (sortBy === 'sales') return b.salesCount - a.salesCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen py-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Controls: Type of Art dropdown & Sort by (Most Hearts) dropdown */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Showing Count */}
          <div className="text-xs sm:text-sm font-semibold text-neutral-600">
            Showing <span className="font-bold text-slate-900">{filteredArtists.length}</span> of {artists.length} artists
          </div>

          {/* Both Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* 1. Sort / Filter by What Type of Art Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="whitespace-nowrap">Type of Art:</span>
              <select
                value={selectedArtType}
                onChange={(e) => setSelectedArtType(e.target.value)}
                className="border border-neutral-200 hover:border-neutral-300 rounded-xl px-3.5 py-2 bg-neutral-50/70 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer transition-colors shadow-2xs text-xs"
              >
                {artTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? `All Types of Art (${artists.length})` : `${type} (${getArtTypeCount(type)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Sort By Dropdown (Most Hearts dropdown) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-neutral-200 hover:border-neutral-300 rounded-xl px-3.5 py-2 bg-neutral-50/70 text-slate-900 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer transition-colors shadow-2xs text-xs"
              >
                <option value="hearts">Most Hearts</option>
                <option value="artworks">Most Artworks</option>
                <option value="sales">Acquisitions Sold</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Artist Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => {
            const estimatedHearts = (artist.followers * 4) + (artist.salesCount * 12);
            return (
              <div
                key={artist.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Artist Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-14 h-14 rounded-full object-cover bg-neutral-100 border-2 border-white shadow-xs ring-1 ring-neutral-200"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" title="Verified Artist" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-base text-slate-900 truncate group-hover:text-[#E52535] transition-colors">
                          {artist.name}
                        </h3>
                        <p className="text-xs text-red-600 font-semibold truncate">
                          {artist.dept}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>{artist.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Discipline Badge (Base on what type of art it is) */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 border ${
                        artist.artType === 'Painting'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : artist.artType === 'Sculpture'
                          ? 'bg-stone-100 text-stone-800 border-stone-300'
                          : artist.artType === 'Architecture'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : artist.artType === 'Photography'
                          ? 'bg-slate-100 text-slate-800 border-slate-300'
                          : artist.artType === 'Digital Art'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {artist.artType}
                    </span>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {artist.bio}
                  </p>

                  {/* Sample Artworks Thumbnail Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Exhibition Studies
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {artist.sampleImages.slice(0, 3).map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-2xs"
                        >
                          <img
                            src={img}
                            alt="Artwork thumbnail"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artist.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-600 text-[10px] font-medium border border-neutral-200/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Metrics: Highlights hearts! */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <div>
                      <span className="font-bold text-slate-900">{artist.artworksCount}</span> works
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">{artist.salesCount}</span> acquisitions
                    </div>
                    <div className="flex items-center gap-1 font-bold text-red-600 bg-red-50/70 px-2 py-0.5 rounded-full border border-red-100/60">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>{estimatedHearts.toLocaleString()} hearts</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Follow and View Profile */}
                <div className="pt-5 flex items-center gap-2">
                  <button
                    onClick={() => onToggleFollow(artist.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                      artist.isFollowed
                        ? 'bg-neutral-100 text-slate-700 hover:bg-neutral-200'
                        : 'border border-neutral-300 text-slate-700 hover:bg-neutral-50'
                    }`}
                  >
                    {artist.isFollowed ? 'Following' : 'Follow'}
                  </button>

                  {/* ONLY this button triggers the single Artist Profile View */}
                  <button
                    onClick={() => onSelectArtist(artist)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs group/btn"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
