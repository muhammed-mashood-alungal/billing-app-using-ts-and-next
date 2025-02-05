'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, TableSortLabel } from '@mui/material';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Axis3D, Grid, List, Search } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';


type Product = {
    id: string;
    name: string;
    code: string;
    price: number;
    stock: number;
    category: string;
    description: string;
    createdAt?:string;
};

export default function ProductsList() {
   

    useEffect(()=>{
       async function fetchAllProducts(){
         const {data} = await axios.get('http://localhost:5000/api/products')
         setProducts(data.products)
       }
       fetchAllProducts()
    },[])
    const [products,setProducts] = useState<Product[]>([])

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');

    
    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    const sortedProducts = filteredProducts ?
    [...filteredProducts]?.sort((a, b) => {
        switch (sortBy) {
            case 'price':
                return a.price - b.price;
            case 'stock':
                return b.stock - a.stock;
            default:
                return a.name.localeCompare(b.name);
        }
    }) : []

    const deleteProduct=async(productId : string ) : Promise<void> =>{
          try{
            await axios.delete(`http://localhost:5000/api/products/${productId}`)
            setProducts((prds)=>{
                return prds.filter((x)=> x.id != productId)
            })
          }catch(error){
            // console.log('Something Went Wrong')
          }
    }

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

            <TableContainer className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Added At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProducts?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.code}</TableCell>
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
                                <TableCell>{product.createdAt}</TableCell>
                                <TableCell>
                                    <Link href={`/products/update/${product.id}`}>
                                    <Button variant="outlined" size="small">Edit</Button>
                                    </Link>
                                    
                                    <Button variant="outlined" color="error" size="small" className="ml-2" 
                                    onClick={()=>{deleteProduct(product.id)}}
                                    >Delete</Button>
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
