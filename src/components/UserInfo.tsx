import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Backdrop, Modal } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { UserRole } from "@/types";
import { getCafeStatus } from "@/app/api/user";
import CafeRegister from './CafeRegister';
import CafeRegisterRequest from "@/components/CafeRegisterRequest";
import CafeModify from "@/components/CafeModify";

interface UserInfoProps {
    name: string;
    role: UserRole;
    email: string;
    onEditCafe?: () => void; // 내 카페 수정 버튼 클릭 핸들러
    onRegisterCafe?: () => void; // 카페 등록 버튼 클릭 핸들러
    onDeleteCafe?: () => void; // 카페 삭제 요청 클릭 핸들러
}

enum AllocationStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    REQUESTED = "REQUESTED"
}

const UserInfo = ({ name, role, email, onEditCafe, onRegisterCafe, onDeleteCafe }: UserInfoProps) => {
    const token = localStorage.getItem("accessToken") || "";
    const [cafeStatus, setCafeStatus] = useState<{
        allocationStatus: AllocationStatus | null;
        cafeId: number | null;
    }>({ allocationStatus: null, cafeId: null });

    const [isModalOpen, setIsModalOpen] = useState(false); // 카페 등록 모달 열림/닫힘 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 카페 수정 모달 열림/닫힘 상태

    useEffect(() => {
        const fetchCafeStatus = async () => {
            try {
                const res = await getCafeStatus(token);
                setCafeStatus({
                    allocationStatus: res.allocationStatus,
                    cafeId: res.cafeId,
                });
                console.log("res: " + res);
            } catch (error) {
                console.error('Error fetching cafe status:', error);
            }
        };

        fetchCafeStatus();
    }, [token]);

    const renderActionButton = () => {
        if (cafeStatus.allocationStatus === AllocationStatus.REQUESTED) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    disabled
                    sx={{
                        ml: 2,
                        borderRadius: 10,
                        height: 25,
                        fontSize: '0.8rem',
                        color: grey[800],
                        bgcolor: grey[300],
                    }}
                >
                    관리자 승인 대기 중
                </Button>
            );
        }

        if (cafeStatus.allocationStatus === AllocationStatus.APPROVED) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        ml: 2,
                        borderRadius: 10,
                        height: 25,
                        fontSize: '0.8rem',
                        color: 'white',
                        bgcolor: blue[300],
                        '&:hover': { bgcolor: blue[500] },
                    }}
                    onClick={() => setIsEditModalOpen(true)} // 카페 수정 모달 열기
                >
                    내 카페 수정
                </Button>
            );
        }

        if (role === UserRole.ROLE_NORMAL_USER || !cafeStatus.allocationStatus) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        ml: 2,
                        borderRadius: 10,
                        height: 25,
                        fontSize: '0.8rem',
                        color: 'white',
                        bgcolor: blue[300],
                        '&:hover': { bgcolor: blue[500] },
                    }}
                    onClick={() => setIsModalOpen(true)} // 카페 등록 모달 열기
                >
                    카페 등록
                </Button>
            );
        }

        return null;
    };

    return (
        <>
            <Paper
                sx={{
                    width: 350,
                    height: 'auto',
                    borderRadius: '12px',
                    p: 2,
                    boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
                }}
            >
                {/* User Info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: grey[900] }}>
                        {name} <span style={{ fontSize: 12, color: grey[700] }}>{UserRole[role]}</span>
                    </Typography>
                    {renderActionButton()}
                </Box>

                <Typography variant="body1" sx={{ mt: 1, color: grey[800] }}>
                    [메일] {email}
                </Typography>

                {/* Footer */}
                {role === UserRole.ROLE_CAFE_OWNER && (
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        {onDeleteCafe && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: grey[800],
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    '&:hover': { color: grey[600] },
                                }}
                                onClick={onDeleteCafe}
                            >
                                카페 삭제 요청
                            </Typography>
                        )}
                    </Box>
                )}
            </Paper>

            {/* 카페 등록 모달 */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        borderRadius: 8,
                    }}
                >
                    <CafeRegisterRequest />
                </Box>
            </Modal>

            {/* 카페 수정 모달 */}
            <Modal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)} // 수정 모달 닫기
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'white',
                        borderRadius: 8,
                    }}
                >
                    {/* 카페 수정 컴포넌트 */}
                    <CafeModify /> {/* 여기에 카페 수정 컴포넌트를 삽입 */}
                </Box>
            </Modal>
        </>
    );
};

export default UserInfo;