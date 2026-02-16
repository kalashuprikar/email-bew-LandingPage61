import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableLinkProps {
  label: string;
  href: string;
  onUpdate: (label: string, href: string) => void;
  onDelete?: () => void;
  inline?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  label,
  href,
  onUpdate,
  onDelete,
  inline = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);
  const [editHref, setEditHref] = useState(href);

  const handleSave = () => {
    onUpdate(editLabel, editHref);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(label);
    setEditHref(href);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div
        className="cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => setIsEditing(true)}
        title="Click to edit"
      >
        {inline ? <span>{label}</span> : <a href={href}>{label}</a>}
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col gap-1 w-full">
        <Input
          placeholder="Link text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          size="sm"
          className="text-xs"
        />
        <Input
          placeholder="URL"
          value={editHref}
          onChange={(e) => setEditHref(e.target.value)}
          size="sm"
          className="text-xs"
        />
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-6 px-2 text-xs"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        {onDelete && (
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={onDelete}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};
