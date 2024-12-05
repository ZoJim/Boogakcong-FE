import {Card, Typography} from "@mui/material";

interface PostingProps {
    title: string;
    content: string;
}


const Posting = ({title, content}: PostingProps) => {
    return <Card
        sx={
            {
                borderRadius: 12,
                width: 350,
                height: 150,
            }
        }
    >
        <Typography variant="h4" sx={{ mt: 2 }}>
            {title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
            {content}
        </Typography>
    </Card>
}

export default Posting;