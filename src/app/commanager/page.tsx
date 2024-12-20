'use client';

import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import UserInfo from '@/components/UserInfo';
import {deleteUser, getUserList} from "@/app/api/user"; // Import deleteUser API
import {toast} from 'react-toastify';
import CafeRegister from "@/components/CafeRegister";
import DeleteInfo from "@/components/DeleteInfo";
import ShortReview from "@/components/ShortReview";
import PostingList from "@/components/PostingList";
import {getReviewList} from "@/app/api/review"; // Import getReviewList API
import {getPostAll} from "@/app/api/post";
import {approveCafeDeleteRequest, deleteCafe, getCafeDeleteRequest, getCafeRegisterRequest} from "@/app/api/cafe"; // Import getPostAll API

const Page = () => {
    const token = localStorage.getItem('accessToken') || null;
    const [userList, setUserList] = useState<any[]>([]); // State to store the list of users
    const [filteredUserList, setFilteredUserList] = useState<any[]>([]); // State for filtered users
    const [reviewList, setReviewList] = useState<any[]>([]); // State for review list
    const [reviewLoading, setReviewLoading] = useState(false);
    const [postList, setPostList] = useState<any[]>([]);
    const [postLoading, setPostLoading] = useState(false); // Changed to boolean for loading state
    const [deleteRequest, setDeleteRequest] = useState<any[]>([]); // State for delete request
    const [deleteRequestLoading, setDeleteRequestLoading] = useState(false); // State for delete request loading
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to handle delete dialog visibility
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); // Store user id to delete
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State to handle confirmation dialog visibility
    const [requestIdToDelete, setRequestIdToDelete] = useState<number | null>(null); // Store cafe id to delete
    const [registerRequest, setRegisterRequest] = useState<any[]>([]); // State for register request
    const [registerRequestLoading, setRegisterRequestLoading] = useState(false); // State for register request loading


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

    // Fetch review list
    const fetchReviewList = async () => {
        if (!token) return;
        setReviewLoading(true);
        try {
            const reviews = await getReviewList(token); // Get reviews from the API
            console.log(reviews); // Check what data you're getting from the API
            setReviewList(reviews);
        } catch (error) {
            toast.error('리뷰 목록을 불러오는 데 실패했습니다.');
        } finally {
            setReviewLoading(false);
        }
    };

    // Fetch post list
    const fetchPostList = async () => {
        if (!token) return;
        setPostLoading(true); // Set loading to true before fetching
        try {
            const posts = await getPostAll(); // Get posts from the API
            console.log(posts); // Check what data you're getting from the API
            setPostList(posts);
        } catch (error) {
            toast.error('게시글 목록을 불러오는 데 실패했습니다.');
        } finally {
            setPostLoading(false); // Set loading to false after fetching is done
        }
    };

    // Fetch delete request list
    const fetchDeleteRequestList = async () => {
        if (!token) return;
        setDeleteRequestLoading(true);
        try {
            const deleteRequests = await getCafeDeleteRequest(token);
            setDeleteRequest(deleteRequests);
        } catch (error) {
            toast.error('카페 삭제 요청 목록을 불러오는 데 실패했습니다.');
        } finally {
            setDeleteRequestLoading(false);
        }
    };

    const fetchRegisterRequest = async () => {
        if (!token) return;
        setRegisterRequestLoading(true);
        try {
            const registerRequests = await getCafeRegisterRequest(token);
            setRegisterRequest(registerRequests);
        } catch (error) {
            toast.error('카페 등록 요청 목록을 불러오는 데 실패했습니다.');
            setRegisterRequestLoading(false);

        }
    }


    useEffect(() => {
        fetchUserList();
        fetchReviewList();
        fetchPostList();
        fetchDeleteRequestList();
        fetchRegisterRequest();
    }, [token]);

    const handleApprove = (requestId: string) => {
        console.log(`${requestId} has been approved.`);
        alert(`${requestId} 등록 요청이 승인되었습니다.`);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filtered = userList.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase()) || // Filter by name
            user.id.toString().includes(query) // Filter by user id (convert to string for partial match)
        );
        setFilteredUserList(filtered); // Update the filtered list only
    };
    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false); // Close the dialog
        setUserIdToDelete(null);
    };


    const handleDeleteCafe = async () => {
        if (!token || requestIdToDelete === null) return;

        try {
            await approveCafeDeleteRequest(token, requestIdToDelete); // Call API to delete the cafe
            toast.success('카페 삭제가 완료되었습니다.');

            // Remove deleted cafe from the delete request list
            setDeleteRequest(deleteRequest.filter(request => request.requestId !== requestIdToDelete));
            handleCloseConfirmDialog(); // Close the dialog after successful deletion
        } catch (error) {
            toast.error('카페 삭제에 실패했습니다.');
        }
    };

    const handleDeleteUser = async () => {
        if (!token || userIdToDelete === null) return;

        try {
            await deleteUser(token, userIdToDelete); // Call API to delete the user
            toast.success('사용자 삭제가 완료되었습니다.');

            // Remove deleted user from the user list
            setUserList(userList.filter(user => user.id !== userIdToDelete));
            handleCloseDeleteDialog(); // Close the dialog after successful deletion
        } catch (error) {
            toast.error('사용자 삭제에 실패했습니다.');
        }
    }


    const handleOpenDeleteDialog = (userId: number) => {
        setUserIdToDelete(userId);
        setOpenDeleteDialog(true); // Open the delete confirmation dialog
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false); // Close the delete confirmation dialog
        setUserIdToDelete(null);
    };

    const handleOpenConfirmDialog = (requestId: number) => {
        console.log('Request ID to delete:', requestId); // 여기서 requestId 값을 확인
        if (requestId === undefined) {
            console.error('requestId가 undefined입니다!');
        }
        setRequestIdToDelete(requestId);
        setOpenConfirmDialog(true);
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
            <Box sx={{mb: 3}}>
                <Typography variant="h3" sx={{fontSize: 24, fontWeight: 'bold', mb: 1, color: 'white'}}>
                    회원 관리
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
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
                            '&:hover': {bgcolor: grey[300]},
                        }}
                    >
                        <img src="/images/search.png" alt="검색" style={{width: 20, height: 20}}/>
                    </IconButton>
                </Box>

                {/* 회원 정보 & 삭제 버튼 */}
                {loading ? (
                    <Typography variant="h6" sx={{color: 'white'}}>로딩 중...</Typography>
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
                                    <Box sx={{width: 'calc(100% - 100px)', marginBottom: -5}}>
                                        <UserInfo
                                            name={user.name}
                                            role={user.role}
                                            email={user.email}
                                            onEditCafe={() => {
                                            }}
                                            onDeleteCafe={() => {
                                            }}
                                            isConsole={true}
                                        />
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        sx={{marginLeft: -10, bgcolor: 'white'}}
                                        onClick={() => handleOpenDeleteDialog(user.id)} // Open delete confirmation dialog
                                    >
                                        삭제
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="h6" sx={{color: 'white'}}>사용자가 없습니다.</Typography>
                        )}
                    </Box>
                )}
            </Box>

            {/* 간단 후기 모니터링 */}
            <Box>
                <Typography variant="h3" sx={{fontSize: 24, fontWeight: 'bold', mb: 1, color: 'white'}}>
                    간단 후기 모니터링
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        maxHeight: 100, // Set max height
                        overflowY: 'auto', // Enable vertical scroll
                        width: '100%',
                    }}
                >
                    {reviewLoading ? (
                        <Typography variant="h6" sx={{color: 'white'}}>리뷰 로딩 중...</Typography>
                    ) : (
                        reviewList.length > 0 ? (
                            reviewList.map((review, index) => (
                                <Box key={index} sx={{}}>
                                    <ShortReview
                                        cafeId={review.cafeId}
                                        cafeName={review.cafeName}
                                        content={review.content}
                                        createdAt={review.createdAt}
                                        onClick={undefined}
                                    />
                                </Box>
                            ))
                        ) : (
                            <Typography variant="h6" sx={{color: 'white'}}>등록된 리뷰가 없습니다.</Typography>
                        )
                    )}
                </Box>
            </Box>

            {/* 게시글 모니터링 */}
            <Box sx={{flex: 1, borderRadius: 2, p: 0}}>
                <Typography variant="h3" sx={{fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white'}}>
                    게시글 모니터링
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        height: '300px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {postLoading ? (
                        <Typography variant="h6" sx={{color: 'white'}}>게시글 로딩 중...</Typography>
                    ) : (
                        postList.length > 0 ? (
                            postList.map((post, index) => (
                                <Box key={index} sx={{mb: 1, p: 0, borderRadius: 2}}>
                                    <PostingList
                                        title={post.title}
                                        content={post.content}
                                        createdAt={post.createdAt}
                                        imageUrl={post.imageUrl}
                                        onClick={undefined}
                                    />
                                </Box>
                            ))
                        ) : (
                            <Typography variant="h6" sx={{color: 'white'}}>게시글이 없습니다.</Typography>
                        )
                    )}
                </Box>
            </Box>

            {/* 카페 삭제 & 등록 요청 */}
            <Box sx={{flex: 1, borderRadius: 2, p: 0, width: 350}}>
                <Typography variant="h3" sx={{fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white'}}>
                    카페 요청
                </Typography>

                {/* 카페 삭제 요청 */}
                <Typography variant="h4" sx={{fontSize: 20, fontWeight: 'bold', mb: 1, color: 'white'}}>
                    삭제 요청
                </Typography>
                {deleteRequestLoading ? (
                    <Typography variant="h6" sx={{color: 'white'}}>삭제 요청을 불러오는 중...</Typography>
                ) : (
                    deleteRequest.length > 0 ? (
                        deleteRequest.map((request) => (
                            <Box key={request.cafeId} sx={{mb: 1, p: 0, borderRadius: 2}}>
                                <DeleteInfo
                                    cafeID={request.cafeId}
                                    cafeName={request.cafeName}
                                    deleteReason={request.deleteReason}
                                    requestStatus={request.requestStatus}
                                    onApprove={handleOpenConfirmDialog} // Pass onApprove callback
                                    requestId={request.id}
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="h6" sx={{color: 'white'}}>삭제 요청이 없습니다.</Typography>
                    )
                )}

                {/* 카페 등록 승인 */}
                <Typography variant="h4" sx={{fontSize: 20, fontWeight: 'bold', mt: 2, mb: 1, color: 'white'}}>
                    등록 요청
                </Typography>
                {registerRequestLoading ? (
                    registerRequest.length === 0 ? (
                        <Typography variant="h6" sx={{color: 'white'}}>목록 요청이 없습니다.</Typography>
                    ) : (
                        registerRequest.map((register) => (
                            <CafeRegister
                                key={register.id}
                                requestId={register.id}
                                cafeId={register.cafeId}
                                ownerId={register.ownerId}
                            />
                        ))
                    )
                ) : (
                    <Typography variant="h6" sx={{color: 'white'}}>로딩 중...</Typography>
                )}
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
                    <Button onClick={handleDeleteUser} color="error">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 삭제 확인 다이얼로그 */}
            <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <DialogTitle>삭제 확인</DialogTitle>
                <DialogContent>
                    <Typography>정말로 이 카페를 삭제하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">취소</Button>
                    <Button onClick={handleDeleteCafe} color="error">삭제</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Page;