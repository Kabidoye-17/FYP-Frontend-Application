import styled from "styled-components";
import Button from "../../../design_system/Button";
import { EmojiPicker } from "../../../design_system/EmojiPicker";

interface CommentInputToolbarProps {
  onEmojiSelect: (emoji: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  hasContent: boolean;
}

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function CommentInputToolbar({
  onEmojiSelect,
  onSubmit,
  isSubmitting = false,
  hasContent,
}: CommentInputToolbarProps) {
  return (
    <ToolbarContainer>
      <LeftActions>
        <EmojiPicker onEmojiSelect={onEmojiSelect} />
      </LeftActions>
      <RightActions>
        <Button
          backgroundColor="var(--plum)"
          color="white"
          onClick={onSubmit}
          disabled={!hasContent || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Comment"}
        </Button>
      </RightActions>
    </ToolbarContainer>
  );
}

export default CommentInputToolbar;
