
import {
    Packer,
    Document,
    Paragraph,
    Table,
    TableRow,
    TableCell
} from 'docx';

export default function( professor, rData ) {

    let table = { rows: [] };

    

    const doc = new Document({
        sections: [
            {
                children: [ new Table(table) ]
            }
        ],
        creator: 'FedirM',
        description: 'Powered by "Regulation" utility created by Fedir M.',
        title: 'Regulation'
    });

    return Packer.toBuffer( doc );
}