class Pago():
     
    def __init__(self, tarjeta, num_cuenta, codigo, nombre_titular):
            self.tarjeta = tarjeta
            self.num_cuenta = num_cuenta
            self.codigo = codigo
            self.nombre_titular = nombre_titular
            
    def validar_pago(self):
        '''
        Verifica que todos los campos del pago sean correctos
        '''
        if len(str(self.num_cuenta))  < 16:
            return ['Faltan numeros',False]
        elif len(str(self.codigo)) < 3:
            return ['Error en codigo',False]
        elif self.nombre_titular == None:
            return ['Falta el nombre del titular',False]
        else: 
            return ['Todo bien',True]

