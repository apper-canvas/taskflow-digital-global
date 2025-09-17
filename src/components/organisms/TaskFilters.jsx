import React from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskFilters = ({ 
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterPriority,
  onPriorityChange,
  filterCategory,
  onCategoryChange,
  categories,
  onClearFilters,
  onAddTask
}) => {
  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.name, label: cat.name }))
  ];

  const hasActiveFilters = searchTerm || filterStatus !== "all" || filterPriority !== "all" || filterCategory !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <ApperIcon name="Filter" size={20} className="mr-2 text-primary" />
          Filter & Search
        </h2>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button onClick={onAddTask} className="flex items-center shadow-lg">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Task
          </Button>
        </motion.div>
      </div>

      <div className="space-y-4">
        <SearchBar
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title or description..."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FilterDropdown
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            options={statusOptions}
            label="Status"
          />

          <FilterDropdown
            value={filterPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            options={priorityOptions}
            label="Priority"
          />

          <FilterDropdown
            value={filterCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={categoryOptions}
            label="Category"
          />
        </div>

        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between pt-4 border-t border-gray-200"
          >
            <p className="text-sm text-gray-600">
              {searchTerm && `Searching: "${searchTerm}"`}
              {searchTerm && (filterStatus !== "all" || filterPriority !== "all" || filterCategory !== "all") && " • "}
              {filterStatus !== "all" && `Status: ${filterStatus}`}
              {filterStatus !== "all" && (filterPriority !== "all" || filterCategory !== "all") && " • "}
              {filterPriority !== "all" && `Priority: ${filterPriority}`}
              {filterPriority !== "all" && filterCategory !== "all" && " • "}
              {filterCategory !== "all" && `Category: ${filterCategory}`}
            </p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" size={14} className="mr-1" />
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskFilters;