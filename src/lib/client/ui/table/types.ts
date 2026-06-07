export interface Column<T> {
	key: keyof T & string;
	header: string;
	width?: string;
	align?: 'left' | 'center' | 'right';
	sortable?: boolean;
}
