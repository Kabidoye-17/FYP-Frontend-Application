import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonContainer = styled.div`
    padding: 1rem;
`;

const SectionSkeleton = styled.div`
    margin-bottom: 1.5rem;
`;

const TitleSkeleton = styled.div`
    margin-bottom: 0.5rem;
`;

const TableSkeleton = styled.div`
    border: 1px solid var(--section-background);
    border-radius: 8px;
    overflow: hidden;
`;

const RowSkeleton = styled.div`
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    gap: 1rem;
    border-bottom: 1px solid var(--section-background);

    &:last-child {
        border-bottom: none;
    }
`;

function ViewSprintsPageTableSkeleton() {
    return (
        <SkeletonContainer>
            {[1, 2, 3].map((section) => (
                <SectionSkeleton key={section}>
                    <TitleSkeleton>
                        <Skeleton width={80} height={14} />
                    </TitleSkeleton>
                    <TableSkeleton>
                        {[1, 2].map((row) => (
                            <RowSkeleton key={row}>
                                <Skeleton width="30%" height={16} />
                                <Skeleton width="15%" height={16} />
                                <Skeleton width="15%" height={16} />
                                <Skeleton width="15%" height={16} />
                                <Skeleton width={100} height={8} />
                                <Skeleton width={50} height={16} />
                            </RowSkeleton>
                        ))}
                    </TableSkeleton>
                </SectionSkeleton>
            ))}
        </SkeletonContainer>
    );
}

export default ViewSprintsPageTableSkeleton;
