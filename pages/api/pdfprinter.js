
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(req, res) {
  var data = req.body;

  let hotelRows = [[
    { text: 'DATE', bold: true, alignment: 'center' },
    { text: 'CITY', bold: true, alignment: 'center' },
    { text: 'HOTEL NAME/ADDRESS', bold: true, alignment: 'center' },
    { text: 'HOTEL TEL/FAX', bold: true, alignment: 'center' }]]


  var docDefinition = {
    pageSize: 'Letter',
    defaultStyle: {
      //font: 'SimSun'
    },
   
    content: [

      {
        table: {
          headerRows: 1,
          widths: ['10%', '20%', '50%', '20%'],

          body: hotelRows

        }
      },
      // {text:'',pageBreak: 'after'}

    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        alignment: 'center'
      },
      headcode: {
        fontSize: 12,
        bold: true,
      },
      headguide: {
        fontSize: 10,
        bold: true,
        alignment: 'right'
      },
      headertable: {
        bold: true
      },
      anotherStyle: {
        italic: true,
        alignment: 'right'
      }
    }
  };
  // generatePdf(docDefinition, function(response){
  //   res.status(200).send(response);
  // })

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  const response =  pdfDocGenerator.getBase64();
  res.send(response)
};

function generatePdf(docDefinition, callback) {
  try {



    var fonts = {
      Roboto: {
        normal: 'fonts/SimSun-Regular.ttf',
        bold: 'fonts/SimSun-Bold.ttf',
        italics: 'fonts/SimSun-Bold.ttf',
        bolditalics: 'fonts/SimSun-Bold.ttf'
      },
      SimSun: {
        normal: 'fonts/SimSun-Regular.ttf',
        bold: 'fonts/SimSun-Bold.ttf',
        italics: 'fonts/SimSun-Bold.ttf',
        bolditalics: 'fonts/SimSun-Bold.ttf'
      },
      NotoSerif: {
        normal: 'fonts/NotoSerifTC-Regular.otf',
        bold: 'fonts/NotoSerifTC-Bold.otf',
        italics: 'fonts/NotoSerifTC-Regular.otf',
        bolditalics: 'fonts/NotoSerifTC-Regular.otf'
      },
      ming: {
        normal: 'fonts/ming-regular.ttf',
        bold: 'fonts/ming-bold.ttf',
        italics: 'fonts/ming-regular.ttf',
        bolditalics: 'fonts/ming-regular.ttf'
      },
      whzming: {
        normal: 'fonts/whz-ming-regular.ttf',
        bold: 'fonts/whz-ming-bold.ttf',
        italics: 'fonts/whz-ming-regular.ttf',
        bolditalics: 'fonts/whz-ming-regular.ttf'
      },
      qzming: {
        normal: 'fonts/QuanZhenXiMingTi-2.ttf',
        bold: 'fonts/QuanZhenCuMingTi-2.ttf',
        italics: 'fonts/QuanZhenXiMingTi-2.ttf',
        bolditalics: 'fonts/QuanZhenXiMingTi-2.ttf'
      }
    };
    
    var printer = new PdfPrinter(fonts);

    var options = {
      // ...
    }

    var doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      callback('data:application/pdf;base64,' + result.toString('base64'));
    });

    doc.end();

  } catch (err) {
    throw (err);
  }
};