import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import Avatar from "../Avatar";

interface MentionUser {
    id: string;
    name: string;
    color: string;
}

interface MentionListProps {
    items: MentionUser[];
    command: (item: MentionUser) => void;
}

export interface MentionListRef {
    onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const List = styled.div`
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-height: 200px;
    overflow-y: auto;
`;

const Item = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: ${({ $selected }) =>
        $selected ? "var(--hover-background)" : "var(--white)"};
    cursor: pointer;
    text-align: left;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: var(--hover-background);
    }
`;

const Name = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

const MentionList = forwardRef<MentionListRef, MentionListProps>(
    ({ items, command }, ref) => {
        const [selectedIndex, setSelectedIndex] = useState(0);

        const selectItem = (index: number) => {
            const item = items[index];
            if (item) {
                command(item);
            }
        };

        const upHandler = () => {
            setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
        };

        const downHandler = () => {
            setSelectedIndex((prev) => (prev + 1) % items.length);
        };

        const enterHandler = () => {
            selectItem(selectedIndex);
        };

        useEffect(() => {
            setSelectedIndex(0);
        }, [items]);

        useImperativeHandle(ref, () => ({
            onKeyDown: ({ event }: { event: KeyboardEvent }) => {
                if (event.key === "ArrowUp") {
                    upHandler();
                    return true;
                }

                if (event.key === "ArrowDown") {
                    downHandler();
                    return true;
                }

                if (event.key === "Enter") {
                    enterHandler();
                    return true;
                }

                return false;
            },
        }));

        if (items.length === 0) {
            return null;
        }

        return (
            <List>
                {items.map((item, index) => (
                    <Item
                        key={item.id}
                        type="button"
                        $selected={index === selectedIndex}
                        onClick={() => selectItem(index)}
                    >
                        <Avatar size="small" name={item.name} color={item.color} />
                        <Name>{item.name}</Name>
                    </Item>
                ))}
            </List>
        );
    }
);

MentionList.displayName = "MentionList";

export default MentionList;
