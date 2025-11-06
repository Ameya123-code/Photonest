import { useState } from 'react'
import './index.css'

type Post = {
  id: number
  author: string
  avatar: string
  image: string
  title: string
  likes: number
  createdAt: string
}

const samplePosts: Post[] = [
  {
    id: 1,
    author: 'Ava Green',
    avatar: 'https://i.pravatar.cc/40?img=12',
    image: 'https://picsum.photos/id/1015/800/600',
    title: 'Golden hour at the cliffs',
    likes: 124,
    createdAt: '2h',
  },
  {
    id: 2,
    author: 'Liam Park',
    avatar: 'https://i.pravatar.cc/40?img=5',
    image: 'https://picsum.photos/id/1025/800/600',
    title: 'City reflections',
    likes: 87,
    createdAt: '6h',
  },
  {
    id: 3,
    author: 'Maya Ruiz',
    avatar: 'https://i.pravatar.cc/40?img=22',
    image: 'https://picsum.photos/id/1003/800/600',
    title: 'Mountain mist',
    likes: 203,
    createdAt: '1d',
  },
]

function Header({ onOpenUpload }: { onOpenUpload: () => void }) {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-indigo-600">Photify</div>
        <nav className="hidden sm:flex gap-3 text-sm text-gray-600">
          <a className="hover:underline">Home</a>
          <a className="hover:underline">Explore</a>
          <a className="hover:underline">Challenges</a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenUpload}
          className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-500"
        >
          Upload
        </button>
        <img
          src="https://i.pravatar.cc/36?img=7"
          alt="me"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  )
}

function PostCard({ post, onLike }: { post: Post; onLike: (id: number) => void }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
      <div className="flex items-center gap-3 px-4 py-3">
        <img src={post.avatar} className="w-9 h-9 rounded-full" alt={post.author} />
        <div>
          <div className="text-sm font-semibold">{post.author}</div>
          <div className="text-xs text-gray-500">{post.createdAt} • 35 comments</div>
        </div>
      </div>
      <img src={post.image} alt={post.title} className="w-full object-cover max-h-[420px]" />
      <div className="px-4 py-3">
        <h3 className="font-medium">{post.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">{post.likes} likes</div>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(post.id)}
              className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600"
            >
              ❤️ Like
            </button>
            <button className="text-sm px-3 py-1 rounded-md bg-gray-100">Share</button>
          </div>
        </div>
      </div>
    </article>
  )
}

function ProfileSidebar() {
  return (
    <aside className="w-full sm:w-72 bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <div className="flex items-center gap-3">
        <img src="https://i.pravatar.cc/72?img=3" className="w-16 h-16 rounded-full" alt="you" />
        <div>
          <div className="font-semibold">You</div>
          <div className="text-sm text-gray-500">Photographer • Premier</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 text-center text-sm">
        <div>
          <div className="font-semibold">128</div>
          <div className="text-gray-500">Posts</div>
        </div>
        <div>
          <div className="font-semibold">4.1k</div>
          <div className="text-gray-500">Followers</div>
        </div>
        <div>
          <div className="font-semibold">312</div>
          <div className="text-gray-500">Following</div>
        </div>
      </div>
      <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">Edit profile</button>
    </aside>
  )
}

function UploadModal({ open, onClose, onUpload }: { open: boolean; onClose: () => void; onUpload: (title: string, file?: File) => void }) {
  const [title, setTitle] = useState('')

  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-lg p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload to Photify</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>
        <div className="mt-4">
          <label className="block text-sm">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div className="mt-3">
          <label className="block text-sm">Select file (image)</label>
          <input type="file" accept="image/*" className="mt-1" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-100">Cancel</button>
          <button
            onClick={() => {
              onUpload(title)
              setTitle('')
            }}
            className="px-4 py-1 rounded bg-indigo-600 text-white"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [isUploadOpen, setUploadOpen] = useState(false)

  function handleLike(id: number) {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, likes: x.likes + 1 } : x)))
  }

  function handleUpload(title: string) {
    const newPost: Post = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://i.pravatar.cc/40?img=3',
      image: 'https://picsum.photos/seed/' + Date.now() + '/800/600',
      title: title || 'Untitled',
      likes: 0,
      createdAt: 'just now',
    }
    setPosts((p) => [newPost, ...p])
    setUploadOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header onOpenUpload={() => setUploadOpen(true)} />
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <section className="sm:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Feed</h2>
            <div className="text-sm text-gray-500">Sorted by trending</div>
          </div>

          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
            {posts.length === 0 && <div className="text-center text-gray-500">No posts yet — upload the first one.</div>}
          </div>
        </section>

        <aside className="space-y-4">
          <ProfileSidebar />
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h4 className="font-semibold">Active Challenges</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Golden Hour</span>
                <span className="text-xs text-gray-500">Ends in 3d</span>
              </li>
              <li className="flex justify-between">
                <span>Street Portraits</span>
                <span className="text-xs text-gray-500">Ends in 7d</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      <UploadModal open={isUploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleUpload} />
    </div>
  )
}

export default App
