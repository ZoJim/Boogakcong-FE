'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import UserInfo from '@/components/UserInfo';
import { deleteUser, getUserList } from "@/app/api/user"; // Import deleteUser API
import { toast } from 'react-toastify';
import CafeRegister from "@/components/CafeRegister";
import DeleteInfo from "@/components/DeleteInfo";
import ShortReview from "@/components/ShortReview";
import PostingList from "@/components/PostingList";

const Page = () => {
    const token = localStorage.getItem('accessToken') || null;
    const [userList, setUserList] = useState<any[]>([]); // State to store the list of users
    const [filteredUserList, setFilteredUserList] = useState<any[]>([]); // State for filtered users
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to handle delete dialog visibility
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); // Store user id to delete

    // Fetch user list
    const fetchUserList = async () => {
        if (!token) return; // If no token, do not fetch
        setLoading(true);
        try {
            const users = await getUserList(token); // Get the list of users from API
            setUserList(users);
            setFilteredUserList(users); // Initially set filtered list to all users
            toast.success('사용자 목록을 성공적으로 불러왔습니다.');
        } catch (error) {
            console.error('사용자 목록을 불러오는 데 실패했습니다:', error);
            toast.error('사용자 목록을 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, [token]);

    const handleApprove = (requestId: string) => {
        console.log(`${requestId} has been approved.`);
        alert(`${requestId} 등록 요청이 승인되었습니다.`);
    };

    // Handle search functionality
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filter userList based on the search query (both id and name)
        const filtered = userList.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase()) || // Filter by name
            user.id.toString().includes(query) // Filter by user id (convert to string for partial match)
        );
        setFilteredUserList(filtered); // Update the filtered list only
    };

    // Open delete dialog
    const handleOpenDeleteDialog = (userId: number) => {
        setUserIdToDelete(userId);
        setOpenDeleteDialog(true); // Open the delete confirmation dialog
    };

    // Close delete dialog
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false); // Close the delete confirmation dialog
        setUserIdToDelete(null);
    };

    // Handle delete user
    const handleDelete = async () => {
        if (!token || userIdToDelete === null) return;

        try {
            await deleteUser(userIdToDelete, token); // Call API to delete the user
            toast.success('사용자가 삭제되었습니다.');

            // Remove deleted user from both lists
            setUserList(userList.filter(user => user.id !== userIdToDelete));
            setFilteredUserList(filteredUserList.filter(user => user.id !== userIdToDelete));
            handleCloseDeleteDialog(); // Close the dialog after successful deletion
        } catch (error) {
            console.error('사용자 삭제에 실패했습니다:', error);
            toast.error('사용자 삭제에 실패했습니다.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                bgcolor: blue[200],
                p: 3,
            }}
        >
            {/* 제목 */}
            <Typography
                variant="h1"
                sx={{
                    color: 'white',
                    fontSize: 32,
                    mb: 3,
                }}
            >
                커뮤니티 매니저 페이지
            </Typography>

            {/* 컨텐츠 섹션 */}
            <Box>
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    회원 관리
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {/* 검색창 */}
                    <TextField
                        placeholder="회원 검색"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearch}
                        sx={{
                            width: 280,
                            height: 35,
                            marginLeft: 1,
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <IconButton
                        sx={{
                            marginLeft: 1,
                            bgcolor: 'white',
                            padding: 1,
                            borderRadius: '50%',
                            '&:hover': { bgcolor: grey[300] },
                        }}
                    >
                        <img src="/images/search.png" alt="검색" style={{ width: 20, height: 20 }} />
                    </IconButton>
                </Box>

                {/* 회원 정보 & 삭제 버튼 */}
                {loading ? (
                    <Typography variant="h6" sx={{ color: 'white' }}>로딩 중...</Typography>
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '300px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        {filteredUserList.length > 0 ? (
                            filteredUserList.map((user, index) => (
                                <Box
                                    key={user.id || index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 0,
                                        mb: 6,
                                    }}
                                >
                                    <Box sx={{ width: 'calc(100% - 100px)', marginBottom: -5 }}>
                                        <UserInfo
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                            onEditCafe={() => {}}
                                            onDeleteCafe={() => {}}
                                            isConsole={true}
                                        />
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        sx={{ marginLeft: -10, bgcolor: 'white' }}
                                        onClick={() => handleOpenDeleteDialog(user.id)} // Open delete confirmation dialog
                                    >
                                        삭제
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="h6" sx={{ color: 'white' }}>사용자가 없습니다.</Typography>
                        )}
                    </Box>
                )}
            </Box>

            {/* 간단 후기 모니터링 */}
            <Box>
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    간단 후기 모니터링
                </Typography>
                {[1, 2, 3].map((id) => (
                    <Box key={id} sx={{ flex: 1, borderRadius: 2, p: 0 }}>
                        <ShortReview
                            cafeId="1"
                            cafeName="유일무이 카페"
                            content="커피가 산미있어서 호불호가 갈릴 듯 해요"
                            createdAt="2024-12-06T00:19:53.602633"
                            onClick={undefined}
                        />
                    </Box>
                ))}
            </Box>

            {/* 게시글 모니터링 */}
            <Box sx={{ flex: 1, borderRadius: 2, p: 0 }}>
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white' }}>
                    게시글 모니터링
                </Typography>
                {[1, 2].map((id) => (
                    <Box key={id} sx={{ mb: 1, p: 0, borderRadius: 2 }}>
                        <PostingList
                            title="✨ 부산대 최고 유일무이카페 오픈"
                            content="안녕하세요 ~ 유일무이 카페입니다. 커피 1번 리필 가능해요! 얼마전에 오픈했으니 자주 와주세요! 그리고 부산대 이벤트 중이니..."
                            createdAt="2024-12-06T00:19:53.602633"
                            imageUrl="/images/cafe.jpg"
                            onClick={undefined}
                        />
                    </Box>
                ))}
            </Box>

            {/* 카페 삭제 & 등록 요청 */}
            <Box sx={{ flex: 1, borderRadius: 2, p: 0 }}>
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white' }}>
                    카페 요청
                </Typography>
                {/* 카페 삭제 요청 */}
                <Typography variant="h4" sx={{ fontSize: 20, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    삭제 요청
                </Typography>
                {[1, 2].map((id) => (
                    <Box key={id} sx={{ mb: 1, p: 0, borderRadius: 2 }}>
                        {/* DeleteInfo 컴포넌트 사용 */}
                        <DeleteInfo cafeID={id} cafeName="에이바우트" reason="더이상 운영하지 않아요." />
                    </Box>
                ))}

                {/* 카페 등록 승인 */}
                <Typography variant="h4" sx={{ fontSize: 20, fontWeight: 'bold', mt: 2, mb: 1, color: 'white' }}>
                    등록 요청
                </Typography>
                {[1].map((id) => (
                    <Box key={id} sx={{ mb: 1, p: 0, borderRadius: 2 }}>
                        {[{ id: '유저1 & 카페1' }, { id: '유저2 & 카페2' }].map((request) => (
                            <CafeRegister
                                key={request.id}
                                requestId={request.id}
                                onApprove={() => handleApprove(request.id)}
                            />
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>삭제 확인</DialogTitle>
                <DialogContent>
                    <Typography>
                        정말로 이 사용자를 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        취소
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Page;