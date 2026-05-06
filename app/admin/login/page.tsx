'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { div } from 'framer-motion/client';


export default function AdminLogin() {
    // Menyimpan data ketika admin ingin login
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');


// Pindah halaman
const router = useRouter()

// Function akan berjalan saat tombol "masuk ditekan"
const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi sementara (username = admin, password = 123)
    if (username === 'admin' && password === '123'){
        router.push('/admin/dashboard')
    }else{
        // Pesan error jika salah/valid
        setErrorMsg('Username atau passowrd tidak valid')
        }
    }

    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login Admin</h1>
        
       {/* {Jika error menampilkan pesan ini} */}

       {errorMsg && (
        <div className='bg-red-100 text-red-600 p-3 rounded mb-4 test-sm'>
            {errorMsg}
        </div>
       )}



       <form onSubmit={handleLogin} className='flex flex-col gap-4'>

       <div>
        <label className="block text-sm text-gray-700 mb-1">Username</label>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)}
        className='w-full border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder="Masukkan username"
        required
         />
       </div>

       <div>
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
        className='w-full border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder="Masukkan Password"
        required
         />
        </div>

         <button type="submit" className='w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition'
         >
            Masuk
         </button>
         </form>
      </div>
    </div>
  );
}
    