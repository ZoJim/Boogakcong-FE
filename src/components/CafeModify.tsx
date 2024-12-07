import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
} from "@mui/material";
import { getCafeById } from "@/app/api/cafe";
import KakaoMap from "@/components/KakaoMap";

interface CafeModifyProps {
    cafeId: number;
}

const CafeModify = ({ cafeId }: CafeModifyProps) => {
    // 카페 정보 상태 변수들
    const [notice, setNotice] = useState(""); // 공지사항 입력
    const [wifi, setWifi] = useState("유"); // 와이파이 유무 선택
    const [outletCount, setOutletCount] = useState<number | undefined>(); // 콘센트 수
    const [seatCount, setSeatCount] = useState<number | undefined>(); // 최대 좌석 수
    const [cafeName, setCafeName] = useState<string>("");

    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null); // 에러 메시지

    // 카페 정보 불러오기
    useEffect(() => {
        const fetchCafe = async () => {
            try {
                const cafeData = await getCafeById(cafeId); // API 호출
                console.log("API 호출 결과:", cafeData); // API 호출 결과 출력
                setNotice(cafeData.notice || ""); // 기존 공지사항
                setWifi(cafeData.wifi || "유"); // 기존 와이파이 유무
                setCafeName(cafeData.cafeName || "");
                setOutletCount(cafeData.outletCount); // 기존 콘센트 수
                setSeatCount(cafeData.seatCount); // 기존 좌석 수
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error("카페 정보를 가져오는 데 실패했습니다:", error);
                setError("카페 정보를 가져오는 데 실패했습니다.");
                setLoading(false);
            }
        };

        fetchCafe();
    }, [cafeId]); // cafeId가 변경될 때마다 다시 호출

    const handleSubmit = () => {
        console.log("공지사항:", notice);
        console.log("와이파이:", wifi);
        console.log("콘센트 수:", outletCount);
        console.log("최대 좌석 수:", seatCount);
        alert("카페 정보가 저장되었습니다!");
    };

    // 로딩 상태 및 에러 처리
    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,  // 모달의 둥근 테두리
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                width: '350px', // 고정 너비 설정
                height: "auto", // 높이는 내용에 맞게
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    borderRadius: 5,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    width: 350,
                }}
            >
                {/* 제목 */}
                <Typography
                    variant="h3"
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        marginBottom: 2,
                        marginTop: 4,
                    }}
                >
                    {cafeName} {/* 카페 이름 표시 */}
                </Typography>

                {/* 카카오맵 */}
                <Box sx={{ width: "100%", height: 200, marginBottom: 2 }}>
                    <KakaoMap initialLon={127.108622} initialLat={37.401219} level={3} mapId={1} />
                </Box>

                {/* 공지사항 */}
                <Box sx={{ width: "100%", height: 200, marginBottom: 2 }}>
                    <TextField
                        id="notification"
                        label="공지사항"
                        multiline
                        rows={4}
                        fullWidth
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                    />
                </Box>

                {/* 와이파이 유무 & 콘센트/최대 좌석 */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: 2,
                    }}
                >
                    {/* 와이파이 유무 */}
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                            와이파이 유무
                        </Typography>
                        <RadioGroup
                            value={wifi}
                            onChange={(e) => setWifi(e.target.value)}
                        >
                            <FormControlLabel value="유" control={<Radio />} label="유" />
                            <FormControlLabel value="무" control={<Radio />} label="무" />
                        </RadioGroup>
                    </Box>

                    {/* 콘센트 수 & 최대 좌석 수 */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            type="number"
                            label="콘센트 수"
                            size="small"
                            value={outletCount || ""}
                            onChange={(e) => setOutletCount(Number(e.target.value))}
                            sx={{
                                width: 100,
                                mb: 2,
                            }}
                        />
                        <TextField
                            type="number"
                            label="최대 좌석 수"
                            size="small"
                            value={seatCount || ""}
                            onChange={(e) => setSeatCount(Number(e.target.value))}
                            sx={{ width: 100 }}
                        />
                    </Box>
                </Box>
            </Card>

            {/* 완료 버튼 */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                        borderRadius: "10px",
                        paddingX: 4,
                        paddingY: 1,
                        color: "#FFFFFF",
                        backgroundColor: "#2196F3",
                        "&:hover": {
                            backgroundColor: "#1976D2",
                        },
                    }}
                >
                    완료
                </Button>
            </Box>
        </Box>
    );
};

export default CafeModify;