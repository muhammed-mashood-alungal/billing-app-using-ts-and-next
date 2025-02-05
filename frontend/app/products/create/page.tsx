// src/components/CreateProduct.tsx
'use client'
import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    MenuItem,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductData {
    id: number;
    code: string;
    name: string;
    category: string;
    size: string;
    color: string;
    price: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface CreateProductProps {
    onSubmit: (data: Omit<ProductData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
}));

const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Home & Garden',
    'Sports',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'N/A'];

const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black',
    'White',
    'Grey',
    'Other',
];

const CreateProduct: React.FC<CreateProductProps> = () => {
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        category: '',
        size: '',
        color: '',
        price: '',
        stock: '',
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    })
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
            }

            const isValid = validateForm(productData)
            if (!isValid) return

            const response = await axios.post('http://localhost:5000/api/products', productData)

            setNotification({
                open: true,
                message: 'Product created successfully!',
                severity: 'success',
            })
            router.push('/products')

            setFormData({
                code: '',
                name: '',
                category: '',
                size: '',
                color: '',
                price: '',
                stock: '',
            })
        } catch (error) {
            setNotification({
                open: true,
                message: 'Failed to create product. Please try again.',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };
    function validateForm(productData: Omit<ProductData, 'id'>): boolean {
        if (productData.name.trim() == "") {
            setNotification({
                open: true,
                message: 'Enter a valid name',
                severity: 'error',
            });
            return false
        }
        if (productData.category.trim() == "") {
            setNotification({
                open: true,
                message: 'Enter a valid category',
                severity: 'error',
            });
            return false
        }
        if (productData.code.trim() == "") {
            setNotification({
                open: true,
                message: 'Enter a valid code',
                severity: 'error',
            });
            return false
        }
        if (productData.color.trim() == "") {
            setNotification({
                open: true,
                message: 'Enter a valid colour',
                severity: 'error',
            });
            return false
        }
        if (productData.price < 0) {
            setNotification({
                open: true,
                message: 'Enter a valid Price',
                severity: 'error',
            });
            return false
        }
        if (productData.size.trim() == "") {
            setNotification({
                open: true,
                message: 'Enter a valid Size',
                severity: 'error',
            });
            return false
        }
        if (productData.stock < 0) {
            setNotification({
                open: true,
                message: 'Enter a valid stock',
                severity: 'error',
            });
            return false
        }
        return true
    }

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="md">
            <Link href='/products'>
                <Button
                    type="button"
                    variant="contained"
                >
                    Back
                </Button>
            </Link>

            <FormContainer elevation={3}>
                <Typography variant="h5" gutterBottom>
                    Create New Product
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Product Code"
                        value={formData.code}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        name="category"
                        label="Category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        name="size"
                        label="Size"
                        value={formData.size}
                        onChange={handleChange}
                    >
                        {sizes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        select
                        name="color"
                        label="Color"
                        value={formData.color}
                        onChange={handleChange}
                    >
                        {colors.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        type="number"
                        inputProps={{ step: "0.01", min: "0" }}
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="stock"
                        label="Stock"
                        type="number"
                        inputProps={{ min: "0" }}
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </Box>
                </Box>
            </FormContainer>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateProduct;