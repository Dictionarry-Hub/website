export type PageFormatAction =
	| {
			kind: 'copy';
			label: string;
			successLabel: string;
			url: string;
	  }
	| {
			kind: 'download';
			label: string;
			url: string;
			filename: string;
	  };
