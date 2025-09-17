import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, isTomorrow } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    
    return format(date, "MMM dd, yyyy");
  };

  const getDueDateStyle = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    
    if (isPast(date) && !isToday(date)) {
      return "text-error";
    }
    if (isToday(date)) {
      return "text-warning";
    }
    if (isTomorrow(date)) {
      return "text-accent";
    }
    return "text-gray-600";
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && !task.completed;

  return (
    <motion.div
      layout
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-surface rounded-xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl ${
        task.completed 
          ? "border-success/30 bg-gradient-to-br from-success/5 to-success/10" 
          : isOverdue
          ? "border-error/30 bg-gradient-to-br from-error/5 to-error/10"
          : "border-gray-200 hover:border-primary/30"
      }`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Checkbox
            checked={task.completed}
            onChange={onToggleComplete}
            className="mt-1"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 
              className={`text-lg font-semibold leading-tight ${
                task.completed 
                  ? "text-gray-500 line-through" 
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="p-2 text-gray-500 hover:text-primary"
                >
                  <ApperIcon name="Edit2" size={16} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="p-2 text-gray-500 hover:text-error"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
              </motion.div>
            </div>
          </div>

          {task.description && (
            <p 
              className={`text-sm mb-4 leading-relaxed ${
                task.completed 
                  ? "text-gray-400" 
                  : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <PriorityBadge priority={task.priority} />
              
              {task.category && (
                <Badge variant="secondary" size="sm">
                  <ApperIcon name="Tag" size={12} className="mr-1" />
                  {task.category}
                </Badge>
              )}

              {isOverdue && (
                <Badge variant="error" size="sm">
                  <ApperIcon name="AlertTriangle" size={12} className="mr-1" />
                  Overdue
                </Badge>
              )}
            </div>

            {task.dueDate && (
              <div className={`flex items-center text-sm font-medium ${getDueDateStyle(task.dueDate)}`}>
                <ApperIcon name="Calendar" size={14} className="mr-1.5" />
                {formatDueDate(task.dueDate)}
              </div>
            )}
          </div>

          {task.completed && task.completedAt && (
            <div className="mt-3 pt-3 border-t border-success/20">
              <p className="text-sm text-success font-medium flex items-center">
                <ApperIcon name="CheckCircle" size={14} className="mr-1.5" />
                Completed on {format(new Date(task.completedAt), "MMM dd, yyyy 'at' h:mm a")}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;