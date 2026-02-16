import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Trash2, ChevronUp, ChevronDown, Copy, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingPage, LandingPageBlock } from "./types";
import {
  HeaderBlockPreview,
  HeroBlockPreview,
  FeaturesBlockPreview,
  TestimonialsBlockPreview,
  AboutBlockPreview,
  ContactFormBlockPreview,
  FooterBlockPreview,
  SpacerBlockPreview,
  PricingBlockPreview,
  FaqBlockPreview,
  SignupBlockPreview,
  PricingFooterBlockPreview,
} from "./BlockPreviews";

interface DraggableLandingPagePreviewProps {
  page: LandingPage;
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
  onUpdateBlock: (blockId: string, properties: Record<string, any>) => void;
  onDeleteBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  onDuplicateBlock?: (blockId: string) => void;
  onReorderBlocks: (blocks: LandingPageBlock[]) => void;
}

const DragItem: React.FC<{
  block: LandingPageBlock;
  index: number;
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSelect: () => void;
  onUpdate: (props: Record<string, any>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
}> = ({
  block,
  index,
  isSelected,
  canMoveUp,
  canMoveDown,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  moveBlock,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "block",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "block",
    item: () => ({
      index,
      id: block.id,
    }),
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  const blockProps = {
    block,
    isSelected,
    onSelect,
    onUpdate,
  };

  let blockContent;

  switch (block.type) {
    case "header":
      blockContent = <HeaderBlockPreview {...blockProps} />;
      break;
    case "hero":
      blockContent = <HeroBlockPreview {...blockProps} />;
      break;
    case "features":
      blockContent = <FeaturesBlockPreview {...blockProps} />;
      break;
    case "testimonials":
      blockContent = <TestimonialsBlockPreview {...blockProps} />;
      break;
    case "about":
      blockContent = <AboutBlockPreview {...blockProps} />;
      break;
    case "contact-form":
      blockContent = <ContactFormBlockPreview {...blockProps} />;
      break;
    case "footer":
      blockContent = <FooterBlockPreview {...blockProps} />;
      break;
    case "section-spacer":
      blockContent = <SpacerBlockPreview {...blockProps} />;
      break;
    case "pricing":
      blockContent = <PricingBlockPreview {...blockProps} />;
      break;
    case "faq":
      blockContent = <FaqBlockPreview {...blockProps} />;
      break;
    case "signup":
      blockContent = <SignupBlockPreview {...blockProps} />;
      break;
    case "pricing-footer":
      blockContent = <PricingFooterBlockPreview {...blockProps} />;
      break;
    default:
      blockContent = <div>Unknown block type</div>;
  }

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`relative transition-all rounded cursor-pointer group ${
        isDragging ? "opacity-50" : ""
      } ${isSelected ? "ring-2 ring-valasys-orange shadow-lg" : "hover:shadow-md"}`}
    >
      <div
        className="absolute top-2 left-2 flex items-center gap-2 bg-white rounded-lg shadow-lg p-1 z-30 cursor-grab active:cursor-grabbing hover:shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <div onClick={onSelect}>{blockContent}</div>

      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-2 bg-white rounded-lg shadow-lg p-1 z-20">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            title="Move up"
            onClick={(e) => {
              e.stopPropagation();
              if (canMoveUp) onMoveUp();
            }}
            disabled={!canMoveUp}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            title="Move down"
            onClick={(e) => {
              e.stopPropagation();
              if (canMoveDown) onMoveDown();
            }}
            disabled={!canMoveDown}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            title="Duplicate block"
            onClick={(e) => {
              e.stopPropagation();
              if (onDuplicate) onDuplicate();
            }}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            title="Delete block"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export const DraggableLandingPagePreview: React.FC<
  DraggableLandingPagePreviewProps
> = ({
  page,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onDuplicateBlock,
  onReorderBlocks,
}) => {
  const [blocks, setBlocks] = React.useState(page.blocks);

  React.useEffect(() => {
    setBlocks(page.blocks);
  }, [page.blocks]);

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const dragBlock = blocks[dragIndex];
    const newBlocks = [...blocks];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    setBlocks(newBlocks);
    onReorderBlocks(newBlocks);
  };

  const renderBlock = (block: LandingPageBlock, index: number) => {
    const isSelected = selectedBlockId === block.id;
    const canMoveUp = index > 0;
    const canMoveDown = index < blocks.length - 1;

    return (
      <DragItem
        key={block.id}
        block={block}
        index={index}
        isSelected={isSelected}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
        onSelect={() => onSelectBlock(block.id)}
        onUpdate={(props: Record<string, any>) =>
          onUpdateBlock(block.id, props)
        }
        onDelete={() => onDeleteBlock(block.id)}
        onMoveUp={() => onMoveBlock(block.id, "up")}
        onMoveDown={() => onMoveBlock(block.id, "down")}
        onDuplicate={() => onDuplicateBlock?.(block.id)}
        moveBlock={moveBlock}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-4 p-4">
        {blocks.map((block, index) => renderBlock(block, index))}
      </div>
    </DndProvider>
  );
};
