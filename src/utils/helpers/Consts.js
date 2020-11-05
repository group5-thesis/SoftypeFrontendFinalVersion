export default {
	user_max_age:100,
	user_min_age:16,
	password_criteria: {
		minLength:8,
		hasNum:true,
		hasSpecialChar:true
	},
	error: {
		onlyLetters:'Only letters are accepted',
		onlyLettersInName:'Only letters are accepted in the name field',
		onlyNumbers:'Numbers only',
		onlyAlphaNum:'Letters and Numbers only',
		noSpecialChars:'Letters and Numbers only',
		notAllowedChar:'You used an invalid character',
		email:'Invalid Email Address',
		emailNotAllowedChar:'Numbers, letters, periods (.), underscores (_) and at signs (@) are the only characters allowed for the email address',
		birthdate:'Invalid Birthdate',
		notAllowedAge:`You have not reached the minimum age requirement of 16 years old`,
		mobile:'Invalid mobile number',
		pwdNotMatch:'Passwords do not match',
		network:'You have slow internet connection',
		atl1:'1attempt_left',
		atl2:'2attempt_left',
		blk1d:'block_account_1day',
		blk:'block_account',
		wrongInfo:'You entered the wrong information',
		incompleteMiddlename:'Please provide complete middle name',
		featureNotAvailable:'Sorry, this is not yet available. We are still updating this feature to make sure we provide the best experience for you'
	},
	allowedSpecialChars:{
		common:[
			' ','+','-','@','$','(',')','*',"/",':','#',',','=','!','?','.','[',']','{','}','<','>','&','_','%','√','|','\\','~','•','`','...','€','¥','£','¢','α','β','^','®','©','™','π','¤',';'
		],
		email:[
			'@','.','_'
		],
		address:[
			'.','-',',','&','/','\\',' '
		]
	},
}