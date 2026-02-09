import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface IssueDetailTitleProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const TitleContainer = styled.div`
  position: relative;
`;

const TitleDisplay = styled.h1`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: text;
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 6px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--section-background);
  }
`;

const TitleInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  margin: -0.5rem;
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  border: 2px solid var(--plum);
  border-radius: 6px;
  background-color: var(--white);
  box-sizing: content-box;

  &:focus {
    outline: none;
  }
`;

function IssueDetailTitle({ title, onTitleChange }: IssueDetailTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== title) {
      onTitleChange(editValue.trim());
    } else {
      setEditValue(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setEditValue(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <TitleContainer>
        <TitleInput
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </TitleContainer>
    );
  }

  return (
    <TitleContainer>
      <TitleDisplay onClick={handleClick}>{title}</TitleDisplay>
    </TitleContainer>
  );
}

export default IssueDetailTitle;
