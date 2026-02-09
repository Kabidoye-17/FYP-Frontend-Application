import { useState, useRef } from "react";
import styled from "styled-components";
import CommentInputToolbar from "./CommentInputToolbar";

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

const InputContainer = styled.div`
  padding: 1rem;
  background-color: var(--section-background);
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--white);
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-primary);
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--plum);
  }
`;

function CommentInput({ onSubmit }: CommentInputProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.slice(0, start) + emoji + text.slice(end);
      setText(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setText((prev) => prev + emoji);
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    onSubmit(text.trim());
    setText("");
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <InputContainer>
      <TextArea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
      />
      <CommentInputToolbar
        onEmojiSelect={handleEmojiSelect}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        hasContent={text.trim().length > 0}
      />
    </InputContainer>
  );
}

export default CommentInput;
