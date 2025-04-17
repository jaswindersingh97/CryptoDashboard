import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function CoinsList({
  rows,
  page,
  rowsPerPage,
  onPageChange,
  totalCount,
  columns,
  isLoading,
  onRowsPerPageChange,
}) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow> 
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: rowsPerPage }).map((_, idx) => (
                  <TableRow key={idx}>
                    {columns.map((col) => (
                      <TableCell key={col.id}>
                        <span style={{ opacity: 0.3 }}>Loading...</span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : rows.map((row) => (
                  <TableRow hover role="checkbox"  tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.id == 'name' ? (
                        // Wrap the 'Name' column with a Link to the coin details page
                        <Link to={`/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {value}
                        </Link>
                        ):column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 250]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}
