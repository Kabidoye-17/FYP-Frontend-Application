import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface IssueDetailDescriptionProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

const DescriptionContainer = styled.div`
  position: relative;
`;

const DescriptionDisplay = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
  color: var(--text-primary);
  line-height: 1.6;
  cursor: text;
  padding: 0.75rem;
  margin: -0.75rem;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  white-space: pre-wrap;
  min-height: 1.6em;

  &:hover {
    background-color: var(--section-background);
  }
`;

const Placeholder = styled.span`
  color: var(--text-secondary);
`;

const DescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  margin: -0.75rem;
  font-family: "Inter", sans-serif;
  font-size: 0.9375rem;
  color: var(--text-primary);
  line-height: 1.6;
  border: 2px solid var(--plum);
  border-radius: 6px;
  background-color: var(--white);
  resize: vertical;
  box-sizing: content-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

function IssueDetailDescription({
  description,
  onDescriptionChange,
}: IssueDetailDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(description);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== description) {
      onDescriptionChange(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setEditValue(description);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <DescriptionContainer>
        <DescriptionTextarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Add a description..."
        />
      </DescriptionContainer>
    );
  }

  return (
    <DescriptionContainer>
      <DescriptionDisplay onClick={handleClick}>
        {description || (
          <Placeholder>Add a description...</Placeholder>
        )}
      </DescriptionDisplay>
    </DescriptionContainer>
  );
}

export default IssueDetailDescription;
