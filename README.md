# CSGOCheck
1-Introducción
Steam es la mayor plataforma de videojuegos del mundo con más de 75 millones de
usuarios activos al mes y más de 3.000 juegos, esta tiene en su poder un fuerte mercado de
compra-venta de skins(camuflajes para personajes o armas) que engloba los juegos más
jugados de la plataforma como puede ser CSGO, Team Fortress 2, Dota 2,
Playerunknown's Battlegrounds entre otros.
Según mi experiencia con la plataforma de videojuegos de Steam y en concreto con el
juego CSGO me dado cuenta que el mercado que mantiene Steam para este juego es muy
grande, ya que hay un alto porcentaje de personas que tienen una gran cantidad de dinero
invertido en su inventario(conjunto de camuflajes para sus armas).
Al ser yo una de esas personas que invierten decidí orientar mi proyecto a este concepto.
La idea principal del proyecto se basa en aprovechar la gran masa de personas a las que le
gustaría invertir en el mercado de CSGO y de aquellas personas que son curiosas y solo les
gustaría ver los detalles de su inventario y la evolución del mismo durante el año.
Mi proyecto se basará en dar varios servicios al usuario, estos son:
-Tabla de Inventario: Este servicio ofrece al usuario poder ver la totalidad de todos sus
ítems en detalle, se trata de una lista con varias columnas: Nombre del Item, Wear,
Cantidad, Precio Total(suma de todos precios de los ítems con el mismo nombre ), Precio
Unitario.
-Evolución del Inventario: Este servicio proporciona al usuario la capacidad de poder
comparar su inventario entre los meses del año que el usuario desee y visualizar su
profit(ganancias/pérdidas).
-Crear o Ver Inventarios: Cada usuario tiene la oportunidad de poder crear y ver hasta un
máximo de 3 inventarios personalizados, a parte del suyo propio.

Mi proyecto se va a basar en una aplicación web, que tendrá varias páginas:
1o-Login: Fundamental para poder entrar en su propio inventario.
2o-Register: Tendremos que registrar entre otros datos personales, el steam-id para
poder acceder al inventario del usuario.
3o-Bienvenidos: En esta página aparecerán los servicios que ofrece la web CSGO
Check.
4o-Ver tu inventario: En esta página se mostrará la lista de skins que contiene tu
inventario con el respectivo valor de la misma.
5o-Gráfica de la evolución de tu inventario: En esta página se mostrará una
gráfica en la cual en el eje X aparecerán el mes y en el eje Y se mostrará el valor del
inventario en ese mes, esta página posee la función de poder elegir los meses del años que
quieras comparar, apareciendo por pantalla los detalles del primer mes introducido y los del
último, además del porcentaje de ganancias o pérdidas que has tenido.
6o-Crear Inventario Personalizado: Esta página estará compuesta de un formulario
y una lista donde se irán añadiendo los ítems de manera dinámica, el formulario será
necesario para detallar el ítem que deseas borrar o insertar a la lista de tu inventario
personalizado.
7o-Ver Inventarios Personalizados: En esta página podremos observar todos los
inventarios, hasta un máximo de 3, desde aquí podrás visualizar la evolución del inventario
personalizados que habías creado y podrás observar que hubiese pasado si hubieses
invertido en esos ítems. Esta página reutiliza la 5o página y muestra la evolución del
inventario personalizado.
