'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Helper: Upload Image
async function uploadImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
    const uploadDir = path.join(process.cwd(), 'public/uploads')

    try {
        await mkdir(uploadDir, { recursive: true })
        await writeFile(path.join(uploadDir, filename), buffer)
        return `/uploads/${filename}`
    } catch (error) {
        console.error('Error uploading file:', error)
        return null
    }
}

// --- POSTS ---
export async function createPost(prevState: any, formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const categoryName = formData.get('category') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File

    if (!title || !slug || !content) {
        return { message: 'Missing required fields' }
    }

    const imageUrl = await uploadImage(imageFile)

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

export async function updatePost(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const categoryName = formData.get('category') as string
    const slug = formData.get('slug') as string
    const imageFile = formData.get('image') as File

    const imageUrl = await uploadImage(imageFile)

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
    await prisma.post.delete({ where: { id } })
    revalidatePath('/admin/posts')
}

// --- PRODUCTS ---
export async function createProduct(prevState: any, formData: FormData) {
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
    await prisma.product.delete({ where: { id } })
    revalidatePath('/admin/shop')
}


// --- PREDICTIONS ---
export async function createPrediction(prevState: any, formData: FormData) {
    const homeTeam = formData.get('homeTeam') as string
    const awayTeam = formData.get('awayTeam') as string
    const market = formData.get('market') as string
    const odds = parseFloat(formData.get('odds') as string)
    const confidence = parseInt(formData.get('confidence') as string)
    const analysis = formData.get('analysis') as string
    const type = formData.get('type') as string // free, premium, banker
    const dateStr = formData.get('date') as string

    try {
        await prisma.prediction.create({
            data: {
                matchTitle: `${homeTeam} vs ${awayTeam}`,
                date: new Date(dateStr),
                market,
                selection: 'TBD', // simplified
                odds,
                confidence,
                analysis,
                isPremium: type === 'premium',
                isBanker: type === 'banker',
                status: 'PENDING'
            }
        })
    } catch (e) {
        return { message: 'Failed to create prediction' }
    }

    revalidatePath('/admin/predictions')
    revalidatePath('/predictions')
    redirect('/admin/predictions')
}

export async function updatePrediction(id: string, prevState: any, formData: FormData) {
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
    await prisma.prediction.delete({ where: { id } })
    revalidatePath('/admin/predictions')
}

// --- MEMBERS ---
export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin/members')
}

export async function toggleUserRole(id: string) {
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
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // Simple hardcoded check for now (User ID: 1)
    if (username === 'admin' && password === 'admin123') {
        // Set a cookie or session here ideally
        // For now, redirect to dashboard
        redirect('/admin')
    }

    return { message: 'Invalid credentials. Access denied.' }
}
