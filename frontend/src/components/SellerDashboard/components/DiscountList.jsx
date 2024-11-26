import React from 'react';
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
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DiscountList({ discounts, onEditDiscount, onDeleteDiscount }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Mobile view
  if (isMobile) {
    return (
      <Box sx={{ p: 2 }}>
        {discounts.map((discount) => (
          <Card key={discount._id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                  {discount.name}
                </Typography>
                {discount.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {discount.description}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                <Typography variant="body2">
                  Discount: {discount.discountPercentage}%
                </Typography>
                <Typography variant="body2">
                  Status: {discount.status}
                </Typography>
                <Typography variant="body2">
                  Start: {new Date(discount.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  End: {new Date(discount.endDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton 
                  size="small" 
                  onClick={() => onEditDiscount(discount)}
                  color="primary"
                  sx={{ padding: '20px', width: '20px', height: '20px' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDeleteDiscount(discount._id)}
                  color="error"
                  sx={{ padding: '20px', width: '20px', height: '20px' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop/Tablet view
  return (
    <TableContainer
      component={Paper} 
      sx={{ 
        mt: 3,
        borderRadius: 2,
        overflowX: 'auto' // Enable horizontal scroll if needed
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ backgroundColor: 'primary.main',   color: 'white' }}>Name</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }}>Description</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'white', width: '100px' }}>Percentage</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'white', width: '120px' }}>Start Date</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'white', width: '120px' }}>End Date</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'white', width: '100px' }}>Status</TableCell>
            <TableCell align="center" sx={{ backgroundColor: 'primary.main', width: '90px', color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow key={discount._id}>
              <TableCell>
                <Typography noWrap>{discount.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  noWrap 
                  sx={{ 
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {discount.description}
                </Typography>
              </TableCell>
              <TableCell>{discount.discountPercentage}%</TableCell>
              <TableCell>
                {new Date(discount.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(discount.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: discount.status === 'Active' ? 'success.light' : 'error.light',
                    color: 'white',
                    py: 0.5,
                    px: 1,
                    borderRadius: 1,
                    display: 'inline-block'
                  }}
                >
                  {discount.status}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => onEditDiscount(discount)}
                    color="primary"
                    sx={{ padding: '4px' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => onDeleteDiscount(discount._id)}
                    color="error"
                    sx={{ padding: '4px' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DiscountList;
