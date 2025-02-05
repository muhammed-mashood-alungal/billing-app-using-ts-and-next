'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TableSortLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Grid, List, Search } from 'lucide-react';
import Link from 'next/link';


type Product = {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    description: string;
};

export default function ProductsList() {

    const [products] = useState<Product[]>([
        {
            id: '1',
            name: 'Office Chair',
            sku: 'CHR-001',
            price: 199.99,
            stock: 23,
            category: 'Furniture',
            description: 'Ergonomic office chair with lumbar support'
        },
        {
            id: '2',
            name: 'Desk Lamp',
            sku: 'LMP-002',
            price: 49.99,
            stock: 45,
            category: 'Lighting',
            description: 'LED desk lamp with adjustable brightness'
        },
        // Add more sample products as needed
    ]);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products based on selected criterion
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.price - b.price;
            case 'stock':
                return b.stock - a.stock;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-black">Products</h1>
                <Link href='/products/create'>
                    <Button variant="contained" color="primary">
                        Add New Product
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="stock">Stock</MenuItem>
                    </Select>

                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'outlined' : 'contained'}
                            size="small"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'outlined' : 'contained'}
                            size="small"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Table view for product list */}
            <TableContainer className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-sm ${product.stock > 10
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.stock} in stock
                                    </span>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" size="small">Edit</Button>
                                    <Button variant="outlined" color="error" size="small" className="ml-2">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found matching your search.</p>
                </div>
            )}
        </div>
    );
}
