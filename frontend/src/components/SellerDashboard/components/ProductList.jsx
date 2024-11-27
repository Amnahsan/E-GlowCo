import React, { useEffect, useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Box,
  Card,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  Tooltip,
  Badge,
  Pagination
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { fetchProducts, deleteProduct, applyDiscount, removeDiscount } from '../../../api/productService';
import ApplyDiscountForm from './ApplyDiscountForm';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.2 }
  }
};

const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'nameAsc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'priceAsc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'priceDesc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'stockAsc':
      return sortedProducts.sort((a, b) => a.stock - b.stock);
    case 'stockDesc':
      return sortedProducts.sort((a, b) => b.stock - a.stock);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return sortedProducts;
  }
};

const ITEMS_PER_PAGE = 10;

function ProductList({ 
  products, 
  onEditProduct, 
  page, 
  onPageChange, 
  totalPages,
  onRefresh
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDiscountForm, setOpenDiscountForm] = useState(false);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleApplyDiscount = async (productId, discountId) => {
    try {
      await applyDiscount(productId, discountId);
      onRefresh();
      setOpenDiscountForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to apply discount:', error);
    }
  };

  const handleRemoveDiscount = async (productId, discountId) => {
    try {
      await removeDiscount(productId, discountId);
      onRefresh();
      setOpenDiscountForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to remove discount:', error);
    }
  };

  const ProductCard = ({ product }) => (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="mb-4 hover:shadow-md transition-shadow duration-300">
        <Box className="p-4">
          <Box className="flex items-start gap-4">
            {product.images?.[0] && (
              <Box
                component="img"
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}
            <Box className="flex-grow">
              <Box className="flex justify-between items-start">
                <Box>
                  <Typography variant="h6" className="font-semibold text-gray-900">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-2">
                    {product.category}
                  </Typography>
                </Box>
                <Chip
                  label={product.status}
                  size="small"
                  color={product.status === 'Active' ? 'success' : 'error'}
                  className="ml-2"
                />
              </Box>
              
              <Box className="grid grid-cols-3 gap-2 mb-4">
                <Box>
                  <Typography variant="caption" className="text-gray-500">
                    Price
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    ${product.price}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" className="text-gray-500">
                    Stock
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {product.stock}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" className="text-gray-500">
                    Discount
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {product.discount}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="flex justify-end gap-2 mt-2">
            <Tooltip title="Edit Product">
              <IconButton 
                onClick={() => onEditProduct(product)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-8 h-8"
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product">
              <IconButton 
                onClick={() => handleDelete(product._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 w-8 h-8"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Manage Discounts">
              <IconButton 
                onClick={() => {
                  setSelectedProduct(product);
                  setOpenDiscountForm(true);
                }}
                className="bg-purple-50 hover:bg-purple-100 text-purple-600 w-8 h-8"
                size="small"
              >
                <LocalOfferIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );

  // Desktop table row component
  const ProductRow = ({ product }) => (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="hover:bg-gray-50"
    >
      <TableCell>
        <Box className="flex items-center gap-3">
          {product.images?.[0] && (
            <Box
              component="img"
              src={product.images[0]}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <Typography className="font-medium">{product.name}</Typography>
        </Box>
      </TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Badge 
          badgeContent={`${product.discount}%`} 
          color="secondary"
          className="ml-2"
        />
      </TableCell>
      <TableCell>
        <Chip
          label={product.status}
          size="small"
          color={product.status === 'Active' ? 'success' : 'error'}
        />
      </TableCell>
      <TableCell>
        <Box className="flex justify-center gap-1">
          <Tooltip title="Edit Product">
            <IconButton 
              onClick={() => onEditProduct(product)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 w-8 h-8"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Product">
            <IconButton 
              onClick={() => handleDelete(product._id)}
              className="bg-red-50 hover:bg-red-100 text-red-600 w-8 h-8"
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage Discounts">
            <IconButton 
              onClick={() => {
                setSelectedProduct(product);
                setOpenDiscountForm(true);
              }}
              className="bg-purple-50 hover:bg-purple-100 text-purple-600 w-8 h-8 "
              size="small"
            >
              <LocalOfferIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </motion.tr>
  );

  if (isMobile) {
    return (
      <>
        <Box className="p-4">
          <AnimatePresence>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </AnimatePresence>
          
          <Box className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={page}
              onChange={onPageChange}
              color="primary"
            />
          </Box>
        </Box>

        <ApplyDiscountForm
          open={openDiscountForm}
          handleClose={() => {
            setOpenDiscountForm(false);
            setSelectedProduct(null);
          }}
          onApply={handleApplyDiscount}
          onRemove={handleRemoveDiscount}
          product={selectedProduct}
        />
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className="mt-6 rounded-xl shadow-sm">
        <Table stickyHeader>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold bg-gray-50">Product</TableCell>
              <TableCell className="font-semibold bg-gray-50">Category</TableCell>
              <TableCell className="font-semibold bg-gray-50">Price</TableCell>
              <TableCell className="font-semibold bg-gray-50">Stock</TableCell>
              <TableCell className="font-semibold bg-gray-50">Discount</TableCell>
              <TableCell className="font-semibold bg-gray-50">Status</TableCell>
              <TableCell className="font-semibold text-center bg-gray-50">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {products.map((product) => (
                <ProductRow key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex justify-center mt-6">
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </Box>

      <ApplyDiscountForm
        open={openDiscountForm}
        handleClose={() => {
          setOpenDiscountForm(false);
          setSelectedProduct(null);
        }}
        onApply={handleApplyDiscount}
        onRemove={handleRemoveDiscount}
        product={selectedProduct}
      />
    </>
  );
}

export default ProductList;