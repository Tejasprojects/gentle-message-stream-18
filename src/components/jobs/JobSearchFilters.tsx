
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { JobFilter } from "@/types/job";
import { Filter, Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

interface JobSearchFiltersProps {
  onFilterChange: (filters: JobFilter) => void;
  disabled?: boolean;
}

const JobSearchFilters: React.FC<JobSearchFiltersProps> = ({ onFilterChange, disabled = false }) => {
  const [filters, setFilters] = useState<JobFilter>({
    jobType: "all",
    experience: [],
    datePosted: "any",
    remote: false,
    employmentType: "",
  });

  // Memoize the filter change handler to prevent excessive calls
  const handleFilterChange = useCallback((newFilters: JobFilter) => {
    setFilters(newFilters);
    // Only call onFilterChange if the user is not disabled and filters actually changed
    if (!disabled) {
      onFilterChange(newFilters);
    }
  }, [onFilterChange, disabled]);

  const handleJobTypeChange = useCallback((value: string) => {
    const newFilters = { ...filters, jobType: value };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleExperienceChange = useCallback((level: string, checked: boolean) => {
    const newExperience = checked 
      ? [...filters.experience, level]
      : filters.experience.filter(exp => exp !== level);
    const newFilters = { ...filters, experience: newExperience };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleDatePostedChange = useCallback((value: string) => {
    const newFilters = { ...filters, datePosted: value };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleRemoteChange = useCallback((checked: boolean) => {
    const newFilters = { ...filters, remote: checked };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const handleEmploymentTypeChange = useCallback((value: string) => {
    const newFilters = { ...filters, employmentType: value };
    handleFilterChange(newFilters);
  }, [filters, handleFilterChange]);

  const experienceLevels = useMemo(() => [
    "Entry Level",
    "Mid Level", 
    "Senior Level",
    "Executive"
  ], []);

  const datePostedOptions = useMemo(() => [
    { value: "any", label: "Any time" },
    { value: "today", label: "Today" },
    { value: "week", label: "Past week" },
    { value: "month", label: "Past month" }
  ], []);

  const employmentTypes = useMemo(() => [
    { value: "", label: "All types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ], []);

  return (
    <div className="space-y-6">
      {/* Job Type Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-blue-600" />
          <Label className="text-sm font-medium text-gray-900">Job Type</Label>
        </div>
        <Select value={filters.jobType} onValueChange={handleJobTypeChange} disabled={disabled}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Experience Level Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="h-4 w-4 text-green-600" />
          <Label className="text-sm font-medium text-gray-900">Experience Level</Label>
        </div>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-${level}`}
                checked={filters.experience.includes(level)}
                onCheckedChange={(checked) => handleExperienceChange(level, checked as boolean)}
                disabled={disabled}
              />
              <Label htmlFor={`exp-${level}`} className="text-sm text-gray-700">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Posted Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-purple-600" />
          <Label className="text-sm font-medium text-gray-900">Date Posted</Label>
        </div>
        <Select value={filters.datePosted} onValueChange={handleDatePostedChange} disabled={disabled}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {datePostedOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Remote Work Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-orange-600" />
          <Label className="text-sm font-medium text-gray-900">Work Type</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={filters.remote}
            onCheckedChange={handleRemoteChange}
            disabled={disabled}
          />
          <Label htmlFor="remote" className="text-sm text-gray-700">
            Remote Only
          </Label>
        </div>
      </div>

      {/* Employment Type Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-indigo-600" />
          <Label className="text-sm font-medium text-gray-900">Employment Type</Label>
        </div>
        <Select value={filters.employmentType} onValueChange={handleEmploymentTypeChange} disabled={disabled}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {employmentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobSearchFilters;
