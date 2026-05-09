import React from 'react';
import type { Comment } from '../reducers/commentReducer';

interface Props {
  comment: Comment;
  onDelete: (id: number) => void;
}

// React.memo memastikan komponen ini hanya update jika props-nya berubah
const CommentItem: React.FC<Props> = React.memo(({ comment, onDelete }) => {
  console.log(`Rendering Comment: ${comment.id}`); // Untuk testing optimasi

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center mb-3">
      <div>
        <p className="text-gray-200 text-sm">{comment.text}</p>
        <span className="text-[10px] text-gray-500">{comment.date}</span>
      </div>
      <button 
        onClick={() => onDelete(comment.id)}
        className="text-red-500 hover:bg-red-500/10 p-2 rounded-md transition-colors"
      >
        Delete
      </button>
    </div>
  );
});

export default CommentItem;