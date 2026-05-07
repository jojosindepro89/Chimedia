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
import { sendMail } from '@/lib/mail'
import crypto from 'crypto'

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
    const matchTitle = formData.get('matchTitle') as string
    const market = formData.get('market') as string
    const type = formData.get('type') as string // free, premium, banker
    const league = formData.get('league') as string
    const logoUrl = formData.get('logoUrl') as string
    const imageFile = formData.get('codeImage') as File

    if (!matchTitle || !market) {
        return { message: 'Missing required fields' }
    }

    let codeImageUrl = null;
    try {
        codeImageUrl = await uploadImage(imageFile)
    } catch (e: any) {
        console.error("Upload failed in createPrediction", e)
        return { message: e.message || 'Image upload failed' }
    }

    try {
        await prisma.prediction.create({
            data: {
                matchTitle: matchTitle,
                league: league,
                market,
                selection: market, // Use market as the prediction selection
                odds: 1.0,
                confidence: 50,
                resultScore: logoUrl, // Repurpose resultScore to hold the logo URL
                codeImage: codeImageUrl, // New betting code image URL
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
    const matchTitle = formData.get('matchTitle') as string
    const market = formData.get('market') as string
    const type = formData.get('type') as string
    const status = formData.get('status') as string
    const league = formData.get('league') as string
    const logoUrl = formData.get('logoUrl') as string
    const imageFile = formData.get('codeImage') as File

    let codeImageUrl = null;
    try {
        codeImageUrl = await uploadImage(imageFile)
    } catch (e: any) {
        console.error("Upload failed in updatePrediction", e)
        return { message: e.message || 'Image upload failed' }
    }

    try {
        const updateData: any = {
            matchTitle: matchTitle,
            league: league,
            market,
            selection: market,
            odds: 1.0,
            confidence: 50,
            resultScore: logoUrl,
            isPremium: type === 'premium',
            isBanker: type === 'banker',
            status: status || 'PENDING'
        }
        
        if (codeImageUrl) {
            updateData.codeImage = codeImageUrl
        }

        await prisma.prediction.update({
            where: { id },
            data: updateData
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
export async function adminLogin() {
    // NextAuth completely handles this now via signIn('credentials')
}

export async function createFirstAdmin(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const secretKey = formData.get('secretKey') as string

    if (!email || !password || password.length < 6) {
        return { message: 'Invalid data. Password must be at least 6 characters.', success: false }
    }

    // Security: Check if admin exists logic removed as per user request


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
    } catch (e: any) {
        console.error(e)
        if (e?.code === 'P2002') {
            return { message: 'An account with this email already exists.', success: false }
        }
        return { message: 'Failed to create admin account. Please try again.', success: false }
    }

    redirect('/admin/login')
}

export async function adminLogout() {
    await deleteSession()
    redirect('/admin/login')
}

// --- PASSWORD RESET ---
export async function requestPasswordReset(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    if (!email) return { message: 'Email is required' };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // Obscure for security to avoid email harvesting
        return { message: 'If that email is in our system, a reset link has been sent.', success: true };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiration

    // Check if a token already exists and delete to replace
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt
        }
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login/reset-password?token=${token}`;

    await sendMail({
        to: email,
        subject: "Reset your CMHSports Password",
        text: `You recently requested a password reset for your CMHSports account.\n\nPlease go to the following secure link to reset it:\n${resetLink}\n\nThis link will expire in 1 hour.`
    });

    return { message: 'If that email is in our system, a reset link has been sent.', success: true };
}

export async function resetPassword(prevState: any, formData: FormData) {
    const token = formData.get('token') as string;
    const password = formData.get('password') as string;

    if (!token || !password || password.length < 6) {
        return { message: 'Invalid data. Password must be at least 6 characters.' };
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token }
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
        return { message: 'Invalid or expired reset token.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the actual user password
    await prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword }
    });

    // Delete token once used securely
    await prisma.passwordResetToken.delete({
        where: { id: resetToken.id }
    });

    return { message: 'Password reset successfully. You can now login.', success: true };
}

export async function updateAdminPassword(prevState: any, formData: FormData) {
    const session = await verifyAdminSession();
    const email = session.user?.email;
    
    if (!email) {
        return { message: 'Unauthorized' };
    }

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { message: 'All fields are required.' };
    }

    if (newPassword !== confirmPassword) {
        return { message: 'New passwords do not match.' };
    }

    if (newPassword.length < 6) {
        return { message: 'New password must be at least 6 characters long.' };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
        return { message: 'User not found or invalid.' };
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        return { message: 'Current password is incorrect.' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
    });

    try {
        await sendMail({
            to: email,
            subject: "Security Alert: Your Admin Password Was Changed",
            text: `Hello ${user.name || 'Admin'},\n\nYour CMHSports admin password was just changed successfully.\n\nIf you did not make this change, please contact support immediately or reset your password.\n\nBest regards,\nCMHSports Team`
        });
    } catch (error) {
        console.error("Failed to send password change notification:", error);
    }

    return { message: 'Password changed successfully! Check your email for confirmation.', success: true };
}
