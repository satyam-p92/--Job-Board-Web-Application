import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { JobFilter } from '../../types';
import { jobCategories, jobTypes, locations } from '../../data/mockData';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface JobFiltersProps {
  onFilterChange: (filters: JobFilter) => void;
  currentFilters: JobFilter;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange, currentFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState(currentFilters.search || '');
  const [location, setLocation] = useState(currentFilters.location || '');
  const [category, setCategory] = useState(currentFilters.category || '');
  const [type, setType] = useState(currentFilters.type || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search,
      location,
      category,
      type
    });
  };

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setType('');
    onFilterChange({});
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search jobs by title, company or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            <div className="ml-2 sm:ml-4 flex-shrink-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={toggleFilters}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
              <Select
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={[
                  { value: '', label: 'All Locations' },
                  ...locations.map(loc => ({ value: loc, label: loc }))
                ]}
                fullWidth
              />
              
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: '', label: 'All Categories' },
                  ...jobCategories.map(cat => ({ value: cat, label: cat }))
                ]}
                fullWidth
              />
              
              <Select
                label="Job Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                  { value: '', label: 'All Types' },
                  ...jobTypes.map(type => ({ 
                    value: type, 
                    label: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                  }))
                ]}
                fullWidth
              />
              
              <div className="sm:col-span-3 flex justify-between mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleReset}
                  className="flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
                <Button type="submit" variant="primary">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
          
          {!isFilterOpen && (
            <div className="mt-4">
              <Button type="submit" variant="primary" fullWidth>
                Search Jobs
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobFilters;