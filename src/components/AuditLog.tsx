import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface AuditLogEntry {
  action: string;
  timestamp: string;
}

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<'action' | 'timestamp'>('action');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const sampleLogs: AuditLogEntry[] = [
      { action: 'User logged in', timestamp: '2024-10-01T10:00:00Z' },
      { action: 'User logged out', timestamp: '2024-10-02T11:30:00Z' },
      { action: 'Created a new order', timestamp: '2024-10-03T09:15:00Z' },
      { action: 'Updated order status', timestamp: '2024-10-04T14:45:00Z' },
      { action: 'Deleted an order', timestamp: '2024-10-05T16:00:00Z' },
    ];
    setLogs(sampleLogs);
    setFilteredLogs(sampleLogs);
  }, []);

  const handleFilter = () => {
    let filtered = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date(8640000000000000);
      const inDateRange = logDate >= start && logDate <= end;
      const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase());
      return inDateRange && matchesSearch;
    });

    filtered.sort((a, b) => {
      if (sortColumn === 'action') {
        return sortDirection === 'asc' ? a.action.localeCompare(b.action) : b.action.localeCompare(a.action);
      } else {
        return sortDirection === 'asc' ? a.timestamp.localeCompare(b.timestamp) : b.timestamp.localeCompare(a.timestamp);
      }
    });

    setFilteredLogs(filtered);
  };

  const handleSort = (column: 'action' | 'timestamp') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  useEffect(() => {
    handleFilter();
  }, [sortColumn, sortDirection, logs, startDate, endDate, searchQuery]);

  return (
    <div className="bg-white text-gray-800 min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Audit Log</h1>

      <div className="mb-8">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center mb-4"
        >
          <Filter size={18} className="mr-2" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>

        {isFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {['action', 'timestamp'].map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(column as 'action' | 'timestamp')}
                >
                  <div className="flex items-center">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortColumn === column && (
                      sortDirection === 'asc' ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log, index) => {
              const logDate = new Date(log.timestamp);
              const formattedDate = logDate.toLocaleDateString();
              const formattedTime = logDate.toLocaleTimeString();

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{formattedDate} - {formattedTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;
