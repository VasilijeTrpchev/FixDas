import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { ClientPosts } from "../../interfaces/Interfaces";
import UserPost from "./UserPost";
import { Modal } from "bootstrap";

import LoadingSpinner from "../../components/LoadingSpinner";
const fetchUserPosts = async (userId: string) => {
  const res = await fetch(
    `https://api-fixdas.onrender.com/clientPosts?loggedUserId=${userId}`
  );
  const posts = await res.json();
  return posts;
};
const UserPosts = () => {
  const [userPosts, setUserPosts] = useState<ClientPosts[] | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const openModal = (postId: number) => {
    setPostToDelete(postId);
    if (modalRef.current) {
      const bsModal = new Modal(modalRef.current);
      bsModal.show();
    }
  };

  const confirmDelete = async () => {
    if (postToDelete === null) return;
    try {
      await fetch(
        `https://api-fixdas.onrender.com/clientPosts/${postToDelete}`,
        {
          method: "DELETE",
        }
      );

      setUserPosts(
        (prevPosts) =>
          prevPosts?.filter((post) => post.id !== postToDelete) || []
      );

      if (modalRef.current) {
        const modal = Modal.getInstance(modalRef.current);
        modal?.hide();
      }

      setPostToDelete(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const posts = await fetchUserPosts(user.uid);

          setUserPosts(posts);
        } catch (err) {
          console.error("Failed to fetch user posts:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="row mt-5 d-md-flex row-gap-md-3">
        {userPosts === null ? (
          <LoadingSpinner />
        ) : userPosts.length === 0 ? (
          <>
            <h6 className="text-center">You don`t have any posts yet.</h6>
            <p className="text-center">
              Create your first post and get the full experience of our app
            </p>
          </>
        ) : (
          userPosts?.map((post) => {
            return (
              <UserPost
                key={post.id}
                post={post}
                onDeletePost={() => openModal(post.id)}
              />
            );
          })
        )}
      </div>
      {/* remove post modal */}
      <div
        ref={modalRef}
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex={-1}
        aria-labelledby="confirmDeleteModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPosts;
