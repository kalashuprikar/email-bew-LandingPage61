import React, { useState, useEffect } from "react";
import { LandingPageBlock } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { EditableLink } from "./EditableLink";

interface LandingPageSettingsPanelProps {
  block: LandingPageBlock | null;
  onBlockUpdate: (blockId: string, properties: Record<string, any>) => void;
  onBlockDelete?: () => void;
  blockId?: string;
}

export const LandingPageSettingsPanel: React.FC<
  LandingPageSettingsPanelProps
> = ({ block, onBlockUpdate, onBlockDelete, blockId }) => {
  const [localProps, setLocalProps] = useState(block?.properties || {});

  useEffect(() => {
    if (block) {
      setLocalProps(block.properties);
    }
  }, [block?.id]);

  if (!block) {
    return (
      <div className="bg-white border-l border-gray-200 p-6 h-full flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          Select a block to edit its properties
        </p>
      </div>
    );
  }

  const updateProperty = (key: string, value: any) => {
    const updated = { ...localProps, [key]: value };
    setLocalProps(updated);
    if (blockId) {
      onBlockUpdate(blockId, updated);
    }
  };

  const updateNestedProperty = (
    parentKey: string,
    childKey: string,
    value: any,
  ) => {
    const updated = {
      ...localProps,
      [parentKey]: {
        ...(localProps[parentKey] || {}),
        [childKey]: value,
      },
    };
    setLocalProps(updated);
    if (blockId) {
      onBlockUpdate(blockId, updated);
    }
  };

  const renderHeaderBlockSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Logo Text</Label>
        <Input
          value={localProps.logoText || ""}
          onChange={(e) => updateProperty("logoText", e.target.value)}
          placeholder="Logo text"
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">
          Navigation Links
        </Label>
        <div className="space-y-2">
          {localProps.navigationLinks?.map(
            (link: any, index: number) => (
              <EditableLink
                key={index}
                label={link.label}
                href={link.href}
                onUpdate={(label, href) => {
                  const updated = [...(localProps.navigationLinks || [])];
                  updated[index] = { label, href };
                  updateProperty("navigationLinks", updated);
                }}
                onDelete={() => {
                  const updated = (localProps.navigationLinks || []).filter(
                    (_: any, i: number) => i !== index,
                  );
                  updateProperty("navigationLinks", updated);
                }}
              />
            ),
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full"
          onClick={() => {
            const updated = [...(localProps.navigationLinks || [])];
            updated.push({ label: "New Link", href: "#" });
            updateProperty("navigationLinks", updated);
          }}
        >
          + Add Link
        </Button>
      </div>

      <div>
        <Label className="text-sm font-medium">CTA Button Text</Label>
        <Input
          value={localProps.ctaButtonText || ""}
          onChange={(e) => updateProperty("ctaButtonText", e.target.value)}
          placeholder="Button text"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">CTA Button Link</Label>
        <Input
          value={localProps.ctaButtonLink || ""}
          onChange={(e) => updateProperty("ctaButtonLink", e.target.value)}
          placeholder="Button URL"
        />
      </div>
    </div>
  );

  const renderHeroBlockSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Headline</Label>
        <Input
          value={localProps.headline || ""}
          onChange={(e) => updateProperty("headline", e.target.value)}
          placeholder="Headline text"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Subheading</Label>
        <Input
          value={localProps.subheading || ""}
          onChange={(e) => updateProperty("subheading", e.target.value)}
          placeholder="Subheading text"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={localProps.backgroundColor || "#f3f4f6"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            value={localProps.backgroundColor || "#f3f4f6"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            placeholder="#f3f4f6"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Min Height</Label>
        <Input
          value={localProps.minHeight || "500px"}
          onChange={(e) => updateProperty("minHeight", e.target.value)}
          placeholder="500px"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">CTA Button Text</Label>
        <Input
          value={localProps.ctaButtonText || ""}
          onChange={(e) => updateProperty("ctaButtonText", e.target.value)}
          placeholder="Button text"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">CTA Button Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={localProps.ctaButtonColor || "#FF6A00"}
            onChange={(e) => updateProperty("ctaButtonColor", e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            value={localProps.ctaButtonColor || "#FF6A00"}
            onChange={(e) => updateProperty("ctaButtonColor", e.target.value)}
            placeholder="#FF6A00"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );

  const renderFeaturesBlockSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Heading</Label>
        <Input
          value={localProps.heading || ""}
          onChange={(e) => updateProperty("heading", e.target.value)}
          placeholder="Section heading"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Description</Label>
        <Input
          value={localProps.description || ""}
          onChange={(e) => updateProperty("description", e.target.value)}
          placeholder="Section description"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Columns</Label>
        <Input
          type="number"
          value={localProps.columns || 4}
          onChange={(e) =>
            updateProperty("columns", parseInt(e.target.value))
          }
          min="1"
          max="6"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={localProps.backgroundColor || "#ffffff"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            value={localProps.backgroundColor || "#ffffff"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );

  const renderFooterBlockSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Company Name</Label>
        <Input
          value={localProps.companyName || ""}
          onChange={(e) => updateProperty("companyName", e.target.value)}
          placeholder="Company name"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Description</Label>
        <Input
          value={localProps.companyDescription || ""}
          onChange={(e) =>
            updateProperty("companyDescription", e.target.value)
          }
          placeholder="Company description"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Email</Label>
        <Input
          value={localProps.contactInfo?.email || ""}
          onChange={(e) =>
            updateNestedProperty("contactInfo", "email", e.target.value)
          }
          placeholder="Email address"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Phone</Label>
        <Input
          value={localProps.contactInfo?.phone || ""}
          onChange={(e) =>
            updateNestedProperty("contactInfo", "phone", e.target.value)
          }
          placeholder="Phone number"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Background Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={localProps.backgroundColor || "#1f2937"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            value={localProps.backgroundColor || "#1f2937"}
            onChange={(e) => updateProperty("backgroundColor", e.target.value)}
            placeholder="#1f2937"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Text Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={localProps.textColor || "#ffffff"}
            onChange={(e) => updateProperty("textColor", e.target.value)}
            className="w-12 h-10 p-1 cursor-pointer"
          />
          <Input
            value={localProps.textColor || "#ffffff"}
            onChange={(e) => updateProperty("textColor", e.target.value)}
            placeholder="#ffffff"
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Quick Links</Label>
        <div className="space-y-2">
          {localProps.quickLinks?.map((link: any, index: number) => (
            <EditableLink
              key={index}
              label={link.label}
              href={link.href}
              onUpdate={(label, href) => {
                const updated = [...(localProps.quickLinks || [])];
                updated[index] = { label, href };
                updateProperty("quickLinks", updated);
              }}
              onDelete={() => {
                const updated = (localProps.quickLinks || []).filter(
                  (_: any, i: number) => i !== index,
                );
                updateProperty("quickLinks", updated);
              }}
            />
          ))}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full"
          onClick={() => {
            const updated = [...(localProps.quickLinks || [])];
            updated.push({ label: "New Link", href: "#" });
            updateProperty("quickLinks", updated);
          }}
        >
          + Add Link
        </Button>
      </div>
    </div>
  );

  const renderDefaultSettings = () => (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">
          Editing is not yet available for this block type. Select a different
          block to continue.
        </p>
      </div>
    </div>
  );

  const renderBlockSettings = () => {
    switch (block.type) {
      case "header":
        return renderHeaderBlockSettings();
      case "hero":
        return renderHeroBlockSettings();
      case "features":
        return renderFeaturesBlockSettings();
      case "footer":
        return renderFooterBlockSettings();
      default:
        return renderDefaultSettings();
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full overflow-y-auto flex flex-col">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">
          {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Settings
        </h3>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-6">{renderBlockSettings()}</div>
      </div>

      {onBlockDelete && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={onBlockDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Block
          </Button>
        </div>
      )}
    </div>
  );
};
