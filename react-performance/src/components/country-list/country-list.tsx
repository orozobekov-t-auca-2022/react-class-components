import { memo, useMemo, type CSSProperties } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { FixedSizeList as List } from 'react-window';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type RowData = {
  items: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const Row = memo(({ index, style, data }: {index: number, style: CSSProperties, data: RowData}) => {
  const { items, selectedYear, selectedColumns } = data;
  return (
    <div style={style}>
      <CountryCard
        country={items[index]}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
});

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredAndSorted = useMemo(() => {
    const query = searchQuery.toLowerCase();

    const filtered = countries.filter((country) => {
      const matchesSearch = country.id.toLowerCase().includes(query);
      const matchesRegion = !selectedRegion || country.iso_code === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    return filtered.sort((a, b) => {
      if (sortField === 'name') {
        const cmp = a.id.localeCompare(b.id);
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      const mapA = createYearDataMap(a.data);
      const mapB = createYearDataMap(b.data);
      const popA = getPopulationForYear(mapA, selectedYear) ?? 0;
      const popB = getPopulationForYear(mapB, selectedYear) ?? 0;
      return sortOrder === 'asc' ? popA - popB : popB - popA;
    });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const itemData = useMemo<RowData>(
    () => ({ items: filteredAndSorted, selectedYear, selectedColumns }),
    [filteredAndSorted, selectedYear, selectedColumns]
  );

  if (filteredAndSorted.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <List
        height={600}
        width="100%"
        itemCount={filteredAndSorted.length}
        itemSize={260}
        itemData={itemData}
        overscanCount={3}
      >
        {Row}
      </List>
    </div>
  );
});