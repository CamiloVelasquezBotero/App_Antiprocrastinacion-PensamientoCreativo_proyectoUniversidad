'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createComment } from '../../actions/create-comment-action';

interface Comment {
  id: number;
  name: string;
  comment: string;
}

export default function ForumPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const router = useRouter()

  const fetchComments = async () => {
    try {
      const res = await fetch("/forum-comments/api")
      const data = await res.json()
      setComments(data)
    } catch (error) {
      console.log('Error al hacer el fetch')
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return alert('¡Los campos no pueden ir vacios!');


    const newComment: Comment = {
      id: Number(Date.now()),
      name,
      comment,
    };
    setComments([newComment, ...comments]);

    // Create comment en DB
    await createComment({ name, comment })
    setName('');
    setComment('');

  };

  return (
    <>
      <div className='button-header'>
        <button
          className='button-back'
          onClick={() => router.push('/')}
        >⬅️ Volver a la app</button>
      </div>

      <main className="forum-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="forum-grid"
        >
          {/* 🧾 Columna izquierda: Formulario */}
          <div className="forum-left">
            <div className="forum-card">
              <h1 className="forum-title">🗣️ Foro de Opiniones</h1>
              <p className="forum-subtitle">
                Cuéntanos cómo te ha parecido la app y tu experiencia usando nuestra app antiprocrastinacion.
              </p>

              <form onSubmit={handleSubmit} className="forum-form">
                <input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="forum-input"
                />
                <textarea
                  placeholder="Escribe tu comentario..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="forum-textarea"
                />
                <button type="submit" className="forum-button">
                  Enviar comentario
                </button>
              </form>
            </div>
          </div>

          {/* 💬 Columna derecha: Comentarios */}
          <motion.div className="forum-right">
            <section className="forum-comments">
              {comments.length === 0 ? (
                <motion.div>
                  <p className="no-comments">
                    Aún no hay comentarios, ¡sé el primero en opinar!
                  </p>
                </motion.div>
              ) : (
                comments.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="comment-card"
                  >
                    <p className="comment-name">{c.name}</p>
                    <p className="comment-message">{c.comment}</p>
                  </motion.div>
                ))
              )}
            </section>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
