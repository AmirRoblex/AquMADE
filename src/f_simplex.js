export function fun_simplex(orness){
	// This works as getArray.js and better!

	let num_vars = 6;
	let num_conts = 6;
	let fct_objs = 'min';
	let operators = [undefined,"=", "=", "<", "<", "<", "<"];
	let coefs = [[undefined,undefined,undefined,undefined,undefined,undefined,undefined],
	[undefined,'1','0.75','0.5','0.25','0','0'], [undefined,'1','1','1','1','1','0'],
	 [undefined,'1','-1','0','0','0','-1'], [undefined,'0','1','-1','0','0','-1'],
	  [undefined,'0','0','1','-1','0','-1'], [undefined,'0','0','0','1','-1','-1']];
	let bs = [undefined,orness.toString(),'1','0','0','0','0']; //Change here for different results!
	let xs = [undefined,'0','0','0','0','0','1'];
	let taab = [undefined, 1, 0, 0, 0, null, null, null];

	let r_check = 0;

	if (bs[1]<0.5){
		bs[1]=1-bs[1];
		r_check=1;
	}

	function toFloat(num) { //1
		if (num == null || num == "")
			return (parseFloat(0).toFixed(2));
		return (parseFloat(num).toFixed(8));
	}

	function inArray(element, buffer) { //2
		let length = buffer.length;
		for(let i = 0; i < length; i++) {
			if(buffer[i] === element)
				return true;
		}
		return false;
	}

	function fixContraintes(){
		for (let k = 1; k <= num_conts; k++) {
			let b = toFloat(bs[k]);
			let operator = operators[k];
			if (b < 0.0) {
				if (operator.value === '>')
					operator.value = '<';
				else if (operator.value === '<')
					operator.value = '>';
			}
		}
		for (let j = 1; j <= num_vars; j++) {
			for (let i = 1; i <= num_conts; i++) {
				let b = toFloat(bs[i]);
				let x = coefs[i][j];
				if (b < 0.0)
					x.value = (-1) * toFloat(eval(x.value));
			}
		}
	}

	function getArray() {
		num_vars = parseInt(num_vars);
		num_conts = parseInt(num_conts);
		let width = 3 + num_vars;
		let height = 2 + num_conts;
		fixContraintes();
		for (let k = 1; k <= num_conts; k++) {
			let operator = operators[k];
			width += 1;
			if (operator === ">")
				width += 1;
		}
		/*construction du tableau:*/
		let tab = new Array(height);
		for (let i = 0; i < height; i++)  {
			tab[i] = new Array(width);
		}
		/*1er colonne :*/
		tab[0][0] = "V.B";
		let vars = new Array();
		let is_phase1 = 0;
		for (let j = 1; j < height - 1; j++) {
			let operator = operators[j];
			if (operator === '<')
				tab[j][0] = 'e' + j.toString();
			else {
				tab[j][0] = 'a' + j.toString();
				is_phase1++;
			}
			vars.push(tab[j][0]);
			if (operator === '>')
				vars.push('e' + j.toString());
		}
		tab[height - 1][0] = "cout";
		/*1er ligne :*/
		let col = num_vars + 1;
		for (let i = 1; i <= num_vars; i++) {
			tab[0][i] = "x" + i.toString();
		}
		for (let i = 1; i < width - 1; i++) {
			if (inArray("e" + i.toString(), vars))
				tab[0][col++] = "e" + i.toString();
		}
		for (let i = 1; i < width - 1; i++) {
			if (inArray("a" + i.toString(), vars))
				tab[0][col++] = "a" + i.toString();
		}
		tab[0][col++] = "b";
		tab[0][col++] = "ratio";
		/*coef du variables :*/
		for (let j = 1; j <= num_vars; j++) {
			for (let i = 1; i <= num_conts; i++) {
				let x = (coefs[i][j]);
					tab[i][j] = toFloat(eval(x));
			}
		}
		/*coef du e/a :*/
		for (let j = num_vars + 1; j < width - 2; j++) {
			for (let i = 1; i < height - 1; i++) {
				if (tab[0][j] === tab[i][0])
					tab[i][j] = parseFloat('1');
				else if (tab[0][j][0] === 'e' && tab[i][0][0] === 'a' && tab[0][j][1] === tab[i][0][1])
					tab[i][j] = parseFloat('-1');
				else
					tab[i][j] = parseFloat('0');
			}
		}
		/*coef du b/ratio :*/
		for (let i = 1; i < height - 1; i++) {
			tab[i][width - 2] = toFloat(eval(bs[i]));
			if (tab[i][width - 2] < 0.0)
				tab[i][width - 2] = -tab[i][width - 2];
			tab[i][width - 1] = "";
		}
		/*coef du dernier ligne:*/
		if (is_phase1 != 0) {
			for (let j = 1; j < width - 2; j++) {
				if (tab[0][j][0] === 'a')
					tab[height - 1][j] = parseFloat('1');
				else
					tab[height - 1][j] = parseFloat('0');
			}
			tab[height - 1][width - 2] = "";
			tab[height - 1][width - 1] = "";
		}
		else {
			for (let j = 1; j < width - 1; j++) {
				if (tab[0][j][0] === 'x')
					tab[height - 1][j] = toFloat(eval(xs[j]));
				else
					tab[height - 1][j] = parseFloat('0');
			}
			tab[height - 1][width - 1] = "";
		}
		return [tab, width, height, is_phase1];
	}


	//Simplex's related functions

	function is_equal(tab1, tab2, width, height)
	{
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				if (i !== 0 && j !== 0 && parseFloat(tab1[i][j]).toFixed(3).toString() !== parseFloat(tab2[i][j]).toFixed(3).toString())
					return (false);
				else if (i === 0 && j === 0 && tab1[i][j].toString() !== tab2[i][j].toString())
					return (false);
			}
		}
		return (true);
	}

	function get_column(tab, width, height, index) {
		var col  = new Array(height);

		for (var i = 1; i < height - 1; i++) {
			col[i] = tab[i][width - 2] / tab[i][index];
			tab[i][width - 1] =  tab[i][width - 2] / tab[i][index];
			if(col[i] < 0 || tab[i][index] <= 0) {
				col[i] = Infinity;
				tab[i][width - 1] = Infinity;
			}
		}
		return (col);
	}
	function cout_index_max(tab1d, taille) {
		var max_index = 1;

		for(var i = 1; i < taille - 2; i++)  {
			if (parseFloat(tab1d[max_index]) < parseFloat(tab1d[i]))
				max_index = i;
		}
		return (max_index);
	}

	function cout_index_min_bland(tab1d, taille, choix) {
		if (choix == 'min') {
			for (let i = 1; i < taille; i++) {
				if (parseFloat(tab1d[i]) < 0.0)
					return (i);
			}
		}
		else {
			for (let i = 1; i < taille; i++) {
				if (parseFloat(tab1d[i]) > 0.0)
					return (i);
			}
		}
		return (1);
	}
	function column_index_min_bland(tab1d, taille) {
		for(var i = 1; i < taille; i++) {
			if (tab1d[i] != Infinity)
				return (i);
		}
		return (1);
	}
	function cout_index_min(tab1d, taille) {
		var min_index = 1;

		for(var i = 1; i < taille; i++) {
			if (parseFloat(tab1d[min_index]) > parseFloat(tab1d[i]))
				min_index = i;
		}
		return (min_index);
	}
	function pivot(tab, n, m, choix, bland) {
		let point = new Array(2);
		let col;

		if(choix === 'max')
			point[1] = cout_index_max(tab[m - 1], n);
		else if(choix === 'min' && bland)
			point[1] = cout_index_min_bland(tab[m - 1], n - 2, choix);
		else if(choix === 'min')
			point[1] = cout_index_min(tab[m - 1], n - 2);

		col = get_column(tab, n, m ,point[1]);
		if (bland)
			point[0] = column_index_min_bland(col,  m - 1);
		else
			point[0] = cout_index_min(col,  m - 1);
		return (point);
	}

	function cout(tab, width, height, phase_1) {
		let cout = 0.0;
		for (let i = 1; i < height - 1; i++) {
			if (tab[i][0][0] === 'a')
				cout += toFloat(tab[i][width - 2]);
		}
		if (phase_1 == 1)
			return (cout);
		for (let i = 1; i < height - 1; i++) {
			if (tab[i][0][0] === 'x')
				cout += toFloat(tab[i][width - 2]) * toFloat(taab[i]);
		}
		return (cout);
	}

	function gauss(tab, m, n, x, y, choix, phase_1) {
		let new_tab = new Array(m);
		for(let i = 0; i < m; i++) {
			new_tab[i] = new Array(n);
			new_tab[i][0] = tab[i][0];
		}
		for(let i = 0 ; i < n; i++) {
			new_tab[0][i] = tab[0][i];
		}
		tab[x][y] = toFloat(tab[x][y]);
		new_tab[x][0] = tab[0][y];
		for(let i = 1; i < m; i++) {
			for(let j = 1; j < n - 1; j++) {
				tab[i][j] = toFloat(tab[i][j]);
				if (j == y) {
					if (i == x)
						new_tab[i][j] = 1;
					else
						new_tab[i][j] = 0;
				} else {
					if (i == x)
						new_tab[i][j] = (tab[i][j] / tab[x][y]).toFixed(8);
					else if (!(i == m - 1 && j == n - 2)) {
						if (tab[i][j] == -tab[x][j] && tab[x][y] == -tab[i][y])
							new_tab[i][j] = 0.0;
						else
							new_tab[i][j] = ((tab[i][j] * tab[x][y] - tab[i][y] * tab[x][j]) / tab[x][y]).toFixed(8);
					}
				}
			}
		}
		new_tab[m - 1][n - 2] = cout(new_tab, n, m, phase_1);
		return(new_tab);
	}

	function check_positive(tab, m, width) //1
	{
		for(var i = 1; i < width - 2; i++) {
			if (tab[m - 1][i] > 0)
				return (true);
		}
		return (false);
	}

	function check_negative(tab, m, width) //1
	{
		for(var i = 1; i < width - 2; i++) {
			if (tab[m - 1][i] < 0)
				return (true);
		}
		return (false);
	}

	function get_line_index(tab, m, index) //1
	{

		for (var i = 1; i < m - 1; i++) {
			if(tab[i][index] == 1)
				return (i);
		}
	}

	function check_base(tab, str, height) //1
	{
		for (let i = 1; i < height - 1; i++) {
			if (tab[i][0] == str)
				return true;
		}
		return false;
	}

	function correction(tab, width, height) //1
	{
		var index_line;

		for (var i = 1; i < (width - 2); i++) {
			if(tab[height - 1][i] != 0 && check_base(tab, tab[0][i], height)) {
				index_line = get_line_index(tab, height, i);
				var x = tab[height - 1][i];
				for(var j = 1; j < width - 1; j++) {
					tab[height - 1][j] = tab[height - 1][j] - tab[index_line][j] * (x / tab[index_line][i]);
				}
			}
		}

		tab[height - 1][width - 2]  = Math.abs(tab[height - 1][width - 2]);
	}


	function check_pos_neg(tab, m, n, choix) //1
	{
		if(choix == 'max')
			return(check_positive(tab, m, n));
		return(check_negative(tab, m, n));
	}

	function phas1_to_2(tab, n, m) 
	{
		var new_tab = new Array(m); ////  taille
		var x = 0;
		var y;
		for(var i = 0; i < m; i++) {
			new_tab[i] = new Array(n);
		}
		for(var i = 0; i < m; i++) {
			if(!(tab[i][0][0] === "a")) {
				y = 0;
				for(var j = 0; j < n; j++) {

					if(!(tab[0][j][0] === "a")) {
						new_tab[x][y] = tab[i][j];
						y++;
					}
				}
				x++;
			}
		}
		return(new_tab);
	}
	function check_infinie(tab, width, height) //1
	{
		for(let i = 1; i < height - 1; i++)
		{
			if(tab[i][width - 1] != Infinity)
				return (false);
		}
		return (true);
	}
	function createEqui(choix) { //1
		for (let x = 1; x <= num_vars; x++)
			xs[x] *= -1.0;
		return (choix === "min" ? "max" : "min");
	}

	// Simplex

	function simplex()
	{
		num_conts = parseInt(num_conts); //6
		num_vars = parseInt(num_vars); //6
		let all = getArray(); //start here first -> we go to getArray()
		// console.log(getArray());
		let tab = all[0];
		let tab_init = tab;
		let init = 0;
		let width = all[1];
		let height = all[2];
		let is_phase = all[3];
		let choix = 'min';
		let bland = false;

		if(is_phase != 0) {
			correction(tab,width,height);
			while(check_negative(tab, height, width)) {
				if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
					bland = true;
				}
				var point =  pivot(tab, width ,height, choix, bland);

				if(check_infinie(tab, width, height)) {
					alert("problema ilimitado: b -> infinito - fase 1");
					return;
				}
				tab = gauss(tab,height , width, point[0], point[1], choix, 1);
			}
			tab = phas1_to_2(tab, width, height);
			width -= is_phase;
			if(toFloat(tab[height - 1][width - 2]) != 0) {
				alert("Z != 0 => l' conjunto vazio");
				return ;
			}
			for (let j = 1; j < width - 1; j++) {
				if (tab[0][j][0] === 'x')
					tab[height - 1][j] = toFloat(xs[j]);
				else
					tab[height - 1][j] = parseFloat('0');
			}
			tab[height - 1][width - 1] = "";
			correction(tab, width, height);
		}
		choix = "min";  //Values of min and max
		tab_init = tab;
		init = 0;
		bland = false;
		let already = 0;
		while(check_pos_neg(tab, height, width, choix)) {
			let point = pivot(tab, width ,height, choix, bland);
			if(check_infinie(tab,width,height)) {
				alert("problema ilimitado: b -> infinito");
				return;
			}
			if (already === 1) {
				already = 2;
			}
			else if (already === 2) {
				already = 0;
			}
			else {

			}
			tab = gauss(tab,height , width, point[0], point[1], choix, 0);
			if (++init > 1 && is_equal(tab, tab_init, width - 1, height)) {
				bland = true;
				already = 1;
			}
		}
		// console.log(tab);
		return [tab]
	}
	// console.log(simplex());
	let cons = simplex()[0][1][0];
	// console.log(simplex()[0]);

	let x_params = [];
	let x_vals = [];
	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x1") {
			x_params.push("x1");
			x_vals.push((Number(simplex()[0][k][11])));
		}
	} if (x_params[0] != "x1") {
		x_params.push("x1");
		x_vals.push(0);
	}

	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x2") {
			x_params.push("x2");
			x_vals.push(Number(simplex()[0][k][11]));
		}
	} if (x_params[1] != "x2") {
		x_params.push("x2");
		x_vals.push(0);
	}

	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x3") {
			x_params.push("x3");
			x_vals.push(Number(simplex()[0][k][11]));
		}
	} if (x_params[2] != "x3") {
		x_params.push("x3");
		x_vals.push(0);
	}

	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x4") {
			x_params.push("x4");
			x_vals.push(Number(simplex()[0][k][11]));
		}
	} if (x_params[3] != "x4") {
		x_params.push("x4");
		x_vals.push(0);
	}

	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x5") {
			x_params.push("x5");
			x_vals.push(Number(simplex()[0][k][11]));
		}
	} if (x_params[4] != "x5") {
		x_params.push("x5");
		x_vals.push(0);
	}

	for (let k = 0; k < simplex()[0].length; k++) {
		if (simplex()[0][k][0] == "x6") {
			x_params.push("x6");
			x_vals.push(Number(simplex()[0][k][11]));
		}
	} if (x_params[5] != "x6") {
		x_params.push("x6");
		x_vals.push(0);
	}

	if (r_check==1){
		const lastElement = x_vals.pop();
		x_vals.reverse();
		x_vals.push(lastElement);
	}

	return (x_vals);
}
// console.log(fun_simplex(0.6));
export default "f_simplex.js";