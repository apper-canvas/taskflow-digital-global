import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, showIcon = true }) => {
  const priorityConfig = {
    high: {
      variant: "high",
      icon: "AlertTriangle",
      label: "High Priority"
    },
    medium: {
      variant: "medium", 
      icon: "Clock",
      label: "Medium Priority"
    },
    low: {
      variant: "low",
      icon: "CheckCircle2",
      label: "Low Priority"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <Badge variant={config.variant} size="sm" className="shadow-sm">
      {showIcon && (
        <ApperIcon name={config.icon} size={12} className="mr-1" />
      )}
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

export default PriorityBadge;