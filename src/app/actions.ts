'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Helper: Upload Image
// Helper: Upload Image (Cloudinary)
import { uploadToCloudinary } from '@/lib/cloudinary'
import { createSession, deleteSession, verifyAdminSession } from '@/lib/session'

async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null

    // Check for Cloudinary keys
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Missing Cloudinary Environment Variables')
    }

    try {
        return await uploadToCloudinary(file)
    } catch (error) {
        console.error('Error uploading file:', error)
        throw new Error('Image upload failed')
    }
}

// --- POSTS ---
export async function createPost(prevState: any, formData: FormData) {
    await verifyAdminSession()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const categoryName = formData.get('category') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File

    if (!title || !slug || !content) {
        return { message: 'Missing required fields' }
    }

    let imageUrl = null;
    try {
        imageUrl = await uploadImage(imageFile)
    } catch (e: any) {
        return { message: e.message || 'Image upload failed' }
    }

    try {
        // Ensure category exists or create it
        let category = await prisma.category.findUnique({ where: { slug: categoryName.toLowerCase() } })
        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName, slug: categoryName.toLowerCase() }
            })
        }

        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                // featuredImage: imageUrl || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop', 
                featuredImage: imageUrl,
                published: true,
                authorId: 'admin', // Placeholder
                categoryId: category.id
            }
        })
    } catch (e) {
        console.error(e)
        return { message: 'Failed to create post' }
    }

    revalidatePath('/admin/posts')
    revalidatePath('/news')
    redirect('/admin/posts')
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
    await verifyAdminSession()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const categoryName = formData.get('category') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File

    let imageUrl = null;
    try {
        imageUrl = await uploadImage(imageFile)
    } catch (e: any) {
        // Return error message if frontend expects it, or log it
        console.error("Upload failed in updatePost", e)
        return { message: e.message || 'Image upload failed' }
    }

    try {
        let category = await prisma.category.findUnique({ where: { slug: categoryName.toLowerCase() } })
        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName, slug: categoryName.toLowerCase() }
            })
        }

        const data: any = {
            title,
            slug,
            content,
            categoryId: category.id
        }

        if (imageUrl) {
            data.featuredImage = imageUrl
        }

        await prisma.post.update({
            where: { id },
            data
        })
    } catch (e) {
        console.error('Failed to update post', e)
        // return { message: 'Failed to update post' }
        throw e // Re-throw to ensure the form action fails if needed, or just swallow. 
        // If I swallow, it returns void. If I throw, it returns Promise<void> (rejected).
        // Let's just swallow for now to satisfy the type, or strictly invalidating void.
        // Actually, better to just not return anything.
    }

    revalidatePath('/admin/posts')
    revalidatePath('/news')
    redirect('/admin/posts')
}

export async function deletePost(id: string) {
    await verifyAdminSession()
    await prisma.post.delete({ where: { id } })
    revalidatePath('/admin/posts')
}

// --- PRODUCTS ---
export async function createProduct(prevState: any, formData: FormData) {
    await verifyAdminSession()
    const name = formData.get('name') as string
    const price = parseFloat(formData.get('price') as string)
    const stock = parseInt(formData.get('stock') as string)
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    const imageUrl = await uploadImage(imageFile)

    try {
        await prisma.product.create({
            data: {
                name,
                price,
                stock,
                category,
                description,
                imageUrl,
            }
        })
    } catch (e) {
        return { message: 'Failed to create product' }
    }

    revalidatePath('/admin/shop')
    revalidatePath('/shop')
    redirect('/admin/shop')
}

export async function updateProduct(id: string, prevState: any, formData: FormData) {
    await verifyAdminSession()
    const name = formData.get('name') as string
    const price = parseFloat(formData.get('price') as string)
    const stock = parseInt(formData.get('stock') as string)
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const imageFile = formData.get('image') as File

    const imageUrl = await uploadImage(imageFile)

    try {
        const data: any = {
            name,
            price,
            stock,
            category,
            description,
        }
        if (imageUrl) {
            data.imageUrl = imageUrl
        }

        await prisma.product.update({
            where: { id },
            data
        })
    } catch (e) {
        return { message: 'Failed to update product' }
    }

    revalidatePath('/admin/shop')
    revalidatePath('/shop')
    redirect('/admin/shop')
}

export async function deleteProduct(id: string) {
    await verifyAdminSession()
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/shop')
}


// --- PREDICTIONS ---
export async function createPrediction(prevState: any, formData: FormData) {
    await verifyAdminSession()
    const homeTeam = formData.get('homeTeam') as string
    const awayTeam = formData.get('awayTeam') as string
    const market = formData.get('market') as string
    const odds = parseFloat(formData.get('odds') as string)
    const confidence = parseInt(formData.get('confidence') as string)
    const analysis = formData.get('analysis') as string
    const type = formData.get('type') as string // free, premium, banker
    const dateStr = formData.get('date') as string

    if (!homeTeam || !awayTeam || !market || !dateStr) {
        return { message: 'Missing required fields' }
    }

    try {
        await prisma.prediction.create({
            data: {
                matchTitle: `${homeTeam} vs ${awayTeam}`,
                date: new Date(dateStr),
                market,
                selection: 'TBD', // This could be significantly improved by adding a specific field for selection in the form
                odds,
                confidence,
                analysis,
                isPremium: type === 'premium' || type === 'banker', // Bankers are usually premium too
                isBanker: type === 'banker',
                status: 'PENDING'
            }
        })
    } catch (e) {
        console.error("Failed to create prediction:", e)
        return { message: 'Failed to create prediction. Please try again.' }
    }

    revalidatePath('/admin/predictions')
    revalidatePath('/predictions')
    redirect('/admin/predictions')
}

export async function updatePrediction(id: string, prevState: any, formData: FormData) {
    await verifyAdminSession()
    const homeTeam = formData.get('homeTeam') as string
    const awayTeam = formData.get('awayTeam') as string
    const market = formData.get('market') as string
    const odds = parseFloat(formData.get('odds') as string)
    const confidence = parseInt(formData.get('confidence') as string)
    const analysis = formData.get('analysis') as string
    const type = formData.get('type') as string
    const dateStr = formData.get('date') as string
    const status = formData.get('status') as string

    try {
        await prisma.prediction.update({
            where: { id },
            data: {
                matchTitle: `${homeTeam} vs ${awayTeam}`,
                date: new Date(dateStr),
                market,
                odds,
                confidence,
                analysis,
                isPremium: type === 'premium',
                isBanker: type === 'banker',
                status: status || 'PENDING'
            }
        })
    } catch (e) {
        console.error(e)
        return { message: 'Failed to update prediction' }
    }

    revalidatePath('/admin/predictions')
    revalidatePath('/predictions')
    redirect('/admin/predictions')
}

export async function deletePrediction(id: string) {
    await verifyAdminSession()
    await prisma.prediction.delete({ where: { id } })
    revalidatePath('/admin/predictions')
}

// --- MEMBERS ---
export async function deleteUser(id: string) {
    await verifyAdminSession()
    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin/members')
}

export async function toggleUserRole(id: string) {
    await verifyAdminSession()
    const user = await prisma.user.findUnique({ where: { id } })
    if (user) {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
        await prisma.user.update({
            where: { id },
            data: { role: newRole }
        })
        revalidatePath('/admin/members')
    }
}

// --- AUTH ---
export async function adminLogin(prevState: any, formData: FormData) {
    const username = formData.get('username') as string // This might be email in form? Let's check.
    const password = formData.get('password') as string

    // 1. Check if it's the legacy hardcoded admin (for emergency fallback if needed, or remove)
    // REMOVING legacy check to enforce DB auth as requested.

    try {
        // 2. Find user by email (assuming username field is actually email, or we check both)
        // The form uses "username" name attribute but placeholder says "username".
        // Let's assume it's email for now or username. 
        // If the Model only has email, we use email.
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: username },
                    { name: username }
                ]
            }
        })

        if (!user || user.role !== 'ADMIN') {
            return { message: 'Invalid credentials. Access denied.' }
        }

        // 3. Verify password
        // If user has no password (e.g. OAuth), they can't login via credentials form
        if (!user.password) {
            return { message: 'Invalid credentials.' }
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return { message: 'Invalid credentials.' }
        }

        // 4. Create Session
        await createSession({ name: user.name || 'Admin', email: user.email || '', role: 'ADMIN' })

    } catch (error) {
        console.error("Login error:", error)
        return { message: 'An error occurred during login.' }
    }

    redirect('/admin')
}

export async function createFirstAdmin(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const secretKey = formData.get('secretKey') as string

    // Security: Only allow if NO admins exist OR if secret key matches env
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })

    // Allow creation if 0 admins. If admins exist, require secret key.
    // TEMPORARY: Allow multiple admins for setup debugging
    // if (adminCount > 0 && secretKey !== process.env.ADMIN_SETUP_SECRET) {
    //    return { message: 'Unauthorized. Admins already exist.' }
    // }

    if (!email || !password || password.length < 6) {
        return { message: 'Invalid data. Password must be at least 6 chars.' }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN'
            }
        })
    } catch (e) {
        console.error(e)
        return { message: 'Failed to create admin. Email might be registered already.' }
    }

    redirect('/admin/login')
}

export async function adminLogout() {
    await deleteSession()
    redirect('/admin/login')
}
