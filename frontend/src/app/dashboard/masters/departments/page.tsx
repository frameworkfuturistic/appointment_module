'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronUp, X, LayoutGrid, LayoutList, Loader2, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import axios from 'axios'

interface Department {
  id: string
  name: string
  code: string
  description: string
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Department; direction: 'asc' | 'desc' } | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [filterName, setFilterName] = useState('')
  const [filterCode, setFilterCode] = useState('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Department>()

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8585/api/V1/departments')
      if (Array.isArray(response.data.data)) {
        setDepartments(response.data.data)
      } else {
        throw new Error('Invalid data format received from API')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching departments')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  const onSubmit = async (data: Department) => {
    try {
      setLoading(true)
      const { id, createdAt, updatedAt, ...departmentData } = data

      if (editingDepartment) {
        const response = await axios.put(`http://localhost:8585/api/V1/departments/${editingDepartment.id}`, departmentData)
        if (response.status === 200) {
          setDepartments(departments.map(dept => dept.id === editingDepartment.id ? { ...dept, ...departmentData } : dept))
          setSuccessMessage('Department updated successfully!')
        }
      } else {
        const response = await axios.post('http://localhost:8585/api/V1/departments', departmentData)
        if (response.status === 201) {
          setDepartments([...departments, response.data])
          setSuccessMessage('Department created successfully!')
        }
      }

      setIsDialogOpen(false)
      setEditingDepartment(null)
      reset()
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data.message || 'Error creating/updating department' : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const openDialog = (department?: Department) => {
    if (department) {
      setEditingDepartment(department)
      reset(department)
    } else {
      setEditingDepartment(null)
      reset()
    }
    setIsDialogOpen(true)
  }

  const deleteDepartment = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:8585/api/V1/departments/${id}`)
      setDepartments(departments.filter(dept => dept.id !== id))
      setSuccessMessage('Department deleted successfully!')
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data.message || 'Error deleting department' : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (key: keyof Department) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedDepartments = [...departments].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
    return 0
  })

  const filteredDepartments = sortedDepartments.filter(dept =>
    (dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    (dept.code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const tableHeaderVariants = {
    hover: { backgroundColor: '#f0f9ff', transition: { duration: 0.2 } }
  }

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <div className="">
          <TooltipProvider>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=""
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">Total Departments</h3>
                    <p className="text-3xl font-bold text-indigo-600">{departments.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">Active Departments</h3>
                    <p className="text-3xl font-bold text-green-600">{departments.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">Inactive Departments</h3>
                    <p className="text-3xl font-bold text-red-600">0</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
               
                <div className="p-4 sm:p-6">
                  <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search departments"
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                   
                    <div className="flex gap-2 ">
                     
                      <DropdownMenu>
                        <Tooltip content="Change view">
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm" className="bg-indigo-700 text-white hover:bg-indigo-800 transition-colors duration-200">
                              {viewMode === 'table' ? <LayoutList className="mr-2 h-4 w-4" /> : <LayoutGrid className="mr-2 h-4 w-4" />}
                              View
                            </Button>
                          </DropdownMenuTrigger>
                        </Tooltip>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setViewMode('table')}>Table</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setViewMode('grid')}>Grid</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Tooltip content="Add new department">
                        <Button onClick={() => openDialog()} size="sm" className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 ml-auto">
                          <Plus className="mr-2 h-4 w-4" /> New Department
                        </Button>
                      </Tooltip>
                  </div>


                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {successMessage && (
                    <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-300">
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  )}

                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                  ) : viewMode === 'table' ? (
                    <div className="overflow-hidden rounded-md border">
                      <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                          <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  {['Name', 'Code', 'Description', 'Actions'].map((header) => (
                                    <TableHead key={header} className="whitespace-nowrap">
                                      <motion.div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleSort(header.toLowerCase() as keyof Department)}
                                        whileHover="hover"
                                        variants={tableHeaderVariants}
                                      >
                                        {header}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                      </motion.div>
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <AnimatePresence>
                                  {filteredDepartments.map((department) => (
                                    <motion.tr
                                      key={department.id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <TableCell className="font-medium">{department.name}</TableCell>
                                      <TableCell>{department.code}</TableCell>
                                      <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                                      <TableCell>
                                        <div className="flex space-x-2">
                                          <Tooltip content="Edit department">
                                            <Button variant="outline" size="sm" onClick={() => openDialog(department)}>
                                              <Edit className="h-4 w-4" />
                                            </Button>
                                          </Tooltip>
                                          <Tooltip content="Delete department">
                                            <Button variant="destructive" size="sm" onClick={() => deleteDepartment(department.id)}>
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </Tooltip>
                                        </div>
                                      </TableCell>
                                    </motion.tr>
                                  ))}
                                </AnimatePresence>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredDepartments.map((department) => (
                          <motion.div
                            key={department.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                              <CardContent className="p-4">
                                <h3 className="text-lg font-semibold mb-2 text-indigo-700">{department.name}</h3>
                                <p className="text-sm text-indigo-500 mb-2">{department.code}</p>
                                <p className="text-sm mb-4 text-gray-600">{department.description}</p>
                                <div className="flex justify-end items-center space-x-2">
                                  <Tooltip content="Edit department">
                                    <Button variant="outline" size="sm" onClick={() => openDialog(department)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip content="Delete department">
                                    <Button variant="destructive" size="sm" onClick={() => deleteDepartment(department.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </Tooltip>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{editingDepartment ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input
                          id="name"
                          className="col-span-3"
                          {...register('name', { required: 'Name is required' })}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.name.message}</p>}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="code" className="text-right">
                          Code
                        </label>
                        <Input
                          id="code"
                          className="col-span-3"
                          {...register('code', { 
                            required: 'Code is required',
                            pattern: {
                              value: /^[A-Z]{4}\d{3}$/,
                              message: 'Code must be in the format XXXX000'
                            }
                          })}
                        />
                      </div>
                      {errors.code && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.code.message}</p>}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          className="col-span-3"
                          {...register('description', { required: 'Description is required' })}
                        />
                      </div>
                      {errors.description && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.description.message}</p>}
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-indigo-500"
                style={{ scaleX }}
              />
            </motion.div>
          </TooltipProvider>
        </div>
      </div>
    </main>
  )
}