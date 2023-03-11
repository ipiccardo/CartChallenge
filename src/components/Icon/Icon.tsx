let Icons: any = {
  buscar: "/img/icons/buscar.svg",
  lineaVertical: "/img/icons/lineaVertical.svg",
  cuadrados: "/img/icons/cuadrados.svg",
  filtrar: "/img/icons/filtrar.svg",
  like: "/img/icons/like.svg",
  calculadora: "/img/icons/calculadora.svg",
  success: "/img/icons/Correcto_1Light.svg",
  error: "/img/icons/Cancelar_1Light.svg",
  enviar: "/img/icons/Enviar_1Light.svg",
  dropdown: '/img/icons/dropdown.svg',
  eliminar: '/img/icons/eliminar.svg',
  cerrar: '/img/icons/cerrar.svg',
  flechas: '/img/icons/flechasVerticales.svg'
};

export type IconProps = {
  name: "buscar" | "filtrar" | "like" | "cuadrados" | "calculadora" | "eliminar" | "mapa" | "flechas" | "cruz" | "lineaVertical" | "dropdown" | 'cerrar';
  size: number;
  onClick?: Function;
};

export default function Icon({ name, size, onClick }: IconProps) {
  let src = Icons[name] ? Icons[name] : "/img/icons/buscar.svg";
  return (
    <span className="icon">
      <img
        src={src}
        title={name}
        alt={name}
        height={size}
        width={size}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      />
    </span>
  );
}
