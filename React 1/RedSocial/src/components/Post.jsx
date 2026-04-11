import React, { useState } from 'react';
import styles from './Post.module.css';

const Post = ({ id, name, avatar, time, content, images = [] }) => {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleComment = () => {
    if (newComment.trim() === "") return;

    setComments([
      ...comments,
      { text: newComment, liked: false, replies: [], showReply: false }
    ]);

    setNewComment("");
  };

  // ✅ CORREGIDO (sin mutar estado)
  const toggleLikeComment = (index) => {
    const updated = comments.map((c, i) =>
      i === index ? { ...c, liked: !c.liked } : c
    );
    setComments(updated);
  };

  const toggleReply = (index) => {
    const updated = comments.map((c, i) =>
      i === index ? { ...c, showReply: !c.showReply } : c
    );
    setComments(updated);
  };

  const handleReplyChange = (index, value) => {
    const updated = comments.map((c, i) =>
      i === index ? { ...c, replyText: value } : c
    );
    setComments(updated);
  };

  const addReply = (index) => {
    const updated = comments.map((c, i) => {
      if (i !== index) return c;
      if (!c.replyText) return c;

      return {
        ...c,
        replies: [...c.replies, c.replyText],
        replyText: ""
      };
    });

    setComments(updated);
  };

  return (
    <div 
      id={`post-${id}`}
      className={`w3-container w3-card w3-white w3-round w3-margin ${styles.post}`}
    >
      <br />

      {/* Cabecera */}
      <img 
        src={avatar} 
        alt="Avatar" 
        className={`w3-left w3-circle w3-margin-right ${styles.avatar}`} 
        style={{ width: '60px' }} 
      />

      <span className="w3-right w3-opacity">{time}</span>
      <h4>{name}</h4><br />

      <hr className="w3-clear" />

      {/* Contenido */}
      <p className={styles.content}>{content}</p>

      {/* Imagen */}
      {images.length > 0 && (
        <img 
          src={images[0]} 
          className={`w3-margin-bottom ${styles.image}`} 
          style={{ width: '100%' }} 
          alt="Post" 
        />
      )}

      {/* Botones */}
      <button 
        className={`w3-button w3-theme-d1 w3-margin-bottom ${liked ? 'w3-blue' : ''}`}
        onClick={() => {
          setLiked(!liked);
          setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        }}
      >
        <i className="fa fa-thumbs-up"></i> Me gusta ({likeCount})
      </button>

      

      <button 
        className="w3-button w3-theme-d2 w3-margin-bottom"
        onClick={() => document.querySelector('input')?.focus()}
      >
        <i className="fa fa-comment"></i> Comentar
      </button>

      <button 
        className="w3-button w3-theme-d2 w3-margin-bottom"
        onClick={() => {
          const url = `${window.location.origin}/#post-${id}`;
          prompt("Copia este link:", url);
        }}
      >
        <i className="fa fa-share"></i> Compartir
      </button>

      {/* Comentarios */}
      <div className="w3-margin-top">

        <input
          type="text"
          className={`w3-input w3-border ${styles.commentInput}`}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button className="w3-button w3-theme w3-margin-top" onClick={handleComment}>
          Enviar
        </button>

        <div className="w3-margin-top">
          {comments.map((c, index) => (
            <div key={index} className={`w3-padding w3-light-grey w3-round ${styles.comment}`}>

              <div>{c.text}</div>

              {/* Acciones */}
              <div className={styles.commentActions}>
                <span 
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => toggleLikeComment(index)}
                >
                  👍 {c.liked ? "Te gusta" : "Me gusta"}
                </span>

                <span 
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleReply(index)}
                >
                  Responder
                </span>
              </div>

              {/* Responder */}
              {c.showReply && (
                <div className={styles.replyBox}>
                  <input
                    type="text"
                    className={`w3-input w3-border ${styles.replyInput}`}
                    placeholder="Responder..."
                    value={c.replyText || ""}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                  />

                  <button 
                    className="w3-button w3-theme w3-margin-top"
                    onClick={() => addReply(index)}
                  >
                    Responder
                  </button>

                  {/* Lista respuestas */}
                  {c.replies.map((r, i) => (
                    <div key={i} className={styles.reply}>
                      ↳ {r}
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Post;