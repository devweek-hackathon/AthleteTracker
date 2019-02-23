const racers = [
  { 
    id: 1,
    firstName: 'Andrew',  
    lastName: 'Locke',
    paid: false,
    waiver: {
      signed: true,
      waiverLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  },
  { 
    id: 2,
    firstName: 'Zach',  
    lastName: 'Temp',
    paid: false,
    waiver: {
      signed: false,
      waiverLink: ''
    }
  },
  { 
    id: 3,
    firstName: 'Ocean',  
    lastName: 'Temp',
    paid: true,
    waiver: {
      signed: true,
      waiverLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  },
  { 
    id: 4,
    firstName: 'Lynne',  
    lastName: 'Daniels',
    paid: true,
    waiver: {
      signed: false,
      waiverLink: ''
    }
  },
  { 
    id: 5,
    firstName: 'Allen',  
    lastName: 'Byerly',
    paid: true,
    waiver: {
      signed: true,
      waiverLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  }
]

export { racers };