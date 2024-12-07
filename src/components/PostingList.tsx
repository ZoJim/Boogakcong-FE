import { Card, CardMedia, Typography, Box } from "@mui/material";

interface PostingListProps {
    title: string;
    content: string;
    createdAt: string;
    imageUrl: string;
    userId: number;
    onClick?: () => void;
}

const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// 글자 수 제한 함수
const truncateText = (text: string | null | undefined, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
const PostingList = ({ title, content, createdAt, imageUrl, onClick, userId }: PostingListProps) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: 4,
                width: 350,
                height: 180,
                padding: 2,
                boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "row", // 가로 레이아웃으로 변경
                justifyContent: "space-between",
                backgroundColor: "#fff",
                marginBottom: 1
            }}
        >
            {/* 이미지 섹션 */}
            {imageUrl && (
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="게시글 이미지"
                    sx={{
                        width: 100,
                        height: "100%",
                        borderRadius: 4,
                        marginRight: 2,
                        objectFit: "cover", // 이미지 비율 유지
                    }}
                />
            )}

            {/* 텍스트 섹션 */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography
                    variant="h2"
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
                        fontSize: "0.9rem",
                    }}
                >
                    {truncateText(content, 60)} {/* 글자 수 제한 */}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: "#888",
                        textAlign: "left",
                        fontSize: "0.8rem",
                    }}
                >
                    {formatDate(createdAt)}
                </Typography>
            </Box>
        </Card>
    );
};

export default PostingList;