import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import * as Popover from "../Popover";
import EmojiPickerTrigger from "./EmojiPickerTrigger";
import { EmojiPickerWrapper } from "./EmojiPickerStyles";

interface EmojiData {
  native: string;
  id: string;
  name: string;
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  trigger?: React.ReactNode;
}

function EmojiPicker({ onEmojiSelect, trigger }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiSelect = (emoji: EmojiData) => {
    onEmojiSelect(emoji.native);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        {trigger || <EmojiPickerTrigger />}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          align="end"
          style={{ padding: 0, background: "transparent", boxShadow: "none" }}
        >
          <EmojiPickerWrapper>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              previewPosition="none"
              skinTonePosition="none"
            />
          </EmojiPickerWrapper>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default EmojiPicker;
