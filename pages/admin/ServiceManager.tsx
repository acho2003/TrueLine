import React, { useState, useEffect, useCallback } from 'react';
import { Service } from '../../types'; // Ensure this import is correct
import { getServices, createService, updateService, deleteService } from '../../services/api';
import Spinner from '../../components/Spinner';

// --- ServiceForm Component ---
const ServiceForm = ({ service, onSave, onCancel }: { service: Partial<Service> | null, onSave: (data: FormData) => void, onCancel: () => void }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (service) {
            setName(service.name || '');
            setDescription(service.description || '');
            setPrice(service.price || '');
            setImage(null);
        }
    }, [service]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }
        onSave(formData);
    };

    return (
        <div className="p-6 mb-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm animate-fadeInUp">
            {/* --- THE DEFINITIVE FIX --- */}
            <h3 className="text-xl font-semibold mb-4 text-primary">
                {service && service.hasOwnProperty('_id') ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded" rows={3} />
                <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2 border rounded" />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Service Image</label>
                    <input type="file" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} className="w-full p-2 border rounded" accept="image/*" />
                    {service?.imageUrl && !image && <img src={`http://localhost:5000/${service.imageUrl}`} alt={service.name || 'Service Image'} className="w-20 h-20 mt-2 object-cover rounded" />}
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Save</button>
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </form>
        </div>
    );
};


// --- ServiceManager Component ---
const ServiceManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getServices();
            setServices(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch services');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleSave = async (data: FormData) => {
        try {
            // This type guard remains correct for the if statement.
            if (editingService && editingService._id) {
                await updateService(editingService._id, data);
            } else {
                await createService(data);
            }
            setEditingService(null);
            fetchServices();
        } catch (err: any) {
            setError(err.message || 'Failed to save service');
        }
    };
    
    const handleDelete = async (id: string) => {
        if(window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                fetchServices();
            } catch (err: any) {
                setError(err.message || 'Failed to delete service');
            }
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Spinner /></div>;
    if (error) return <div className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manage Services</h2>
                <button onClick={() => setEditingService({})} className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark">
                    Add New Service
                </button>
            </div>

            {editingService && <ServiceForm service={editingService} onSave={handleSave} onCancel={() => setEditingService(null)} />}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map(service => (
                            <tr key={service._id}>
                              <td className="px-6 py-4">
  <img 
    src={`backend/${service.imageUrl}`} 
    alt={service.name} 
    className="w-16 h-16 object-cover rounded"
  />
</td>
                                <td className="px-6 py-4 font-medium">{service.name}</td>
                                <td className="px-6 py-4">{service.price}</td>
                                <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                    <button onClick={() => setEditingService(service)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceManager;