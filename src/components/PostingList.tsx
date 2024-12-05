import { Card, Typography } from "@mui/material";

interface PostingListProps {
    title: string;
    content: string;
    createdAt: string;
}

const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const PostingList = ({ title, content, createdAt }: PostingListProps) => {
    return (
        <Card
            sx={{
                borderRadius: 8,
                width: 360,
                height: 180,
                padding: 2,
                boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fff",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 1,
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: "#555",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: 0.5,
                }}
            >
                {content}
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    color: "#888",
                    textAlign: "left",
                    marginTop: "auto", // 날짜를 하단에 배치
                }}
            >
                {formatDate(createdAt)}
            </Typography>
        </Card>
    );
};

export default PostingList;